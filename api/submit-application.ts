// api/submit-application.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PDFDocument, rgb, StandardFonts, PageSizes } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';;
// 1. Add this import to handle file paths in ESM
import { fileURLToPath } from 'url';
import { Resend } from 'resend'; // 1. Import Resend

// 2. Manually define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DATA INTERFACE ---
interface PrimaryFormData {
  pupilName: string;
  homeAddress: string;
  dob: string;
  placeOfBirth: string;
  town: string;
  state: string;
  nationality: string;
  complexion: string;
  bestHobby: string;
  livingWithParents: string;
  reasonsNotLiving: string;
  prevSchoolName: string;
  prevSchoolYears: string;
  fatherName: string;
  fatherOccupation: string;
  fatherOfficeAddress: string;
  fatherHomeAddress: string;
  fatherPhone: string;
  motherName: string;
  motherHomeAddress: string;
  motherPhone: string;
  agreedToRules: boolean;
  medicalNoteAcknowledged: boolean;
}

// --- MAIN PDF GENERATION FUNCTION ---
async function createPrimaryPdf(data: PrimaryFormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // --- 1. LOAD THE BACKGROUND IMAGE ---
  // Now __dirname is defined, so this will work perfectly.
  const bgPath = path.join(__dirname, 'primary-form-bg.jpg'); 
  const bgImageBytes = await fs.readFile(bgPath);
  
  // Embed the image. 
  // IMPORTANT: If your file is a PNG, use embedPng. If JPG, use embedJpg.
  // I am checking the extension to be safe.
  let bgImage;
  if (bgPath.endsWith('.png')) {
      bgImage = await pdfDoc.embedPng(bgImageBytes);
  } else {
      bgImage = await pdfDoc.embedJpg(bgImageBytes);
  }

  // Draw the image to fill the entire page
  page.drawImage(bgImage, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  // --- 2. DEFINE TEXT SETTINGS ---
  const textSize = 11;
  const textColor = rgb(0, 0, 0); // Black text

  // --- 3. WRITE DATA ONTO THE LINES ---
  // Note: PDF coordinates start at the BOTTOM-LEFT. 
  // These are ESTIMATES. You will need to adjust x and y to match your specific image.

  // PUPIL'S NAME
  page.drawText(data.pupilName, { x: 140, y: 641, size: textSize, font, color: textColor });

  // HOME ADDRESS
  page.drawText(data.homeAddress, { x: 142, y: 625, size: textSize, font, color: textColor });

  // DATE OF BIRTH & PLACE OF BIRTH
  page.drawText(data.dob, { x: 140, y: 608, size: textSize, font, color: textColor });
  page.drawText(data.placeOfBirth, { x: 360, y: 608, size: textSize, font, color: textColor });

  // TOWN, STATE, AGE, NATIONALITY
  page.drawText(data.town, { x: 85, y: 593, size: textSize, font, color: textColor });
  page.drawText(data.state, { x: 180, y: 593, size: textSize, font, color: textColor });
  // page.drawText("10", { x: 350, y: 558, size: textSize, font, color: textColor }); // Age (optional)
  page.drawText(data.nationality, { x: 380, y: 593, size: textSize, font, color: textColor });

  // COMPLEXION, HOBBY, PARENTS
  page.drawText(data.complexion, { x: 115, y: 576, size: textSize, font, color: textColor });
  page.drawText(data.bestHobby, { x: 225, y: 576, size: textSize, font, color: textColor });
  const livingStatus = data.livingWithParents === 'yes' ? 'Yes' : 'No';
  page.drawText(livingStatus, { x: 480, y: 576, size: textSize, font, color: textColor });

  // REASON (If any)
  if (data.reasonsNotLiving) {
    page.drawText(data.reasonsNotLiving, { x: 180, y: 560, size: textSize, font, color: textColor });
  }

  // PREVIOUS SCHOOL
  page.drawText(data.prevSchoolName, { x: 80, y: 512, size: textSize, font, color: textColor });
  page.drawText(data.prevSchoolYears, { x: 380, y: 512, size: textSize, font, color: textColor });

  //ATTESTIFICATION
  page.drawText(data.pupilName, { x: 50, y: 447, size: textSize, font, color: textColor });

  // --- PARENT'S INFO ---
  // Father
  page.drawText(data.fatherName, { x: 140, y: 364, size: textSize, font, color: textColor });
  page.drawText(data.fatherOccupation, { x: 170, y: 348, size: textSize, font, color: textColor });
  page.drawText(data.fatherOfficeAddress, { x: 170, y: 331, size: textSize, font, color: textColor });
  page.drawText(data.fatherHomeAddress, { x: 140, y: 300, size: textSize, font, color: textColor });
  page.drawText(data.fatherPhone, { x: 170, y: 285, size: textSize, font, color: textColor });

  // Mother
  page.drawText(data.motherName, { x: 140, y: 268, size: textSize, font, color: textColor });
  page.drawText(data.motherHomeAddress, { x: 170, y: 252, size: textSize, font, color: textColor });
  page.drawText(data.motherPhone, { x: 150, y: 220, size: textSize, font, color: textColor });

  // --- SIGNATURES ---
  const today = new Date().toLocaleDateString();
  page.drawText(today, { x: 450, y: 152, size: 10, font, color: textColor });
  page.drawText(today, { x: 450, y: 136, size: 10, font, color: textColor });
  page.drawText(today, { x: 450, y: 120, size: 10, font, color: textColor });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// --- THE FINAL API HANDLER WITH RESEND EMAIL LOGIC ---
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const formData = request.body as PrimaryFormData;
    console.log('--- RECEIVED FORM DATA, GENERATING PDF ---');

    // 1. Generate the PDF
    const pdfBytes = await createPrimaryPdf(formData);

    // 2. Initialize Resend with your API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 3. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Gods Wisdom Website <onboarding@resend.dev>', // The default sending address for testing
      to: [process.env.EMAIL_TO || ''], // The school's email address
      subject: `New Primary School Application: ${formData.pupilName}`,
      html: `
        <h1>New Admission Application</h1>
        <p>A new application has been submitted for the primary school.</p>
        <p><strong>Applicant Name:</strong> ${formData.pupilName}</p>
        <p>Please find the completed registration form attached as a PDF.</p>
      `,
      attachments: [
        {
          filename: `Registration_Form_${formData.pupilName.replace(/\s/g, '_')}.pdf`,
          content: Buffer.from(pdfBytes), // Attach the generated PDF
        },
      ],
    });

    // 4. Check for errors from the Resend service
    if (error) {
      console.error('--- RESEND FAILED ---', error);
      return response.status(400).json(error);
    }

    console.log('--- EMAIL SENT SUCCESSFULLY ---', data);

    response.status(200).json({
      message: 'Application submitted and email sent successfully!',
    });

  } catch (error) {
    console.error('--- FAILED TO PROCESS ---');
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    response.status(500).json({ message: 'Failed to process application.', error: errorMessage });
  }
}