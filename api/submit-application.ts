// api/submit-application.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PDFDocument, rgb, StandardFonts, PageSizes } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- INTERFACES ---
interface PrimaryFormData {
  formType: "primary";
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
}

interface SecondaryFormData {
  formType: "secondary";
  surname: string;
  otherName: string;
  dob: string;
  placeOfBirth: string;
  sex: string;
  stateOfOrigin: string;
  nationality: string;
  religion: string;
  sponsorName: string;
  relationship: string;
  occupation: string;
  sponsorPhone: string;
  sponsorEmail: string;
  businessAddress: string;
  residentialAddress: string;
  prevSchoolName: string;
  prevSchoolDateFrom: string;
  prevSchoolDateTo: string;
  prevSchoolClassEntry: string;
  prevSchoolClassExit: string;
  healthConditions: string;
}

// --- PDF GENERATORS ---

async function createPrimaryPdf(data: PrimaryFormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  const bgPath = path.join(__dirname, 'primary-form-bg.jpg'); 
  const bgImageBytes = await fs.readFile(bgPath);
  const bgImage = await pdfDoc.embedJpg(bgImageBytes);

  page.drawImage(bgImage, { x: 0, y: 0, width, height });

  const t = 11; // fontSize
  const c = rgb(0, 0, 0); // color

  // Coordinates from your previous adjustments
  page.drawText(data.pupilName, { x: 140, y: 638, size: t, font, color: c });
  page.drawText(data.homeAddress, { x: 145, y: 612, size: t, font, color: c });
  page.drawText(data.dob, { x: 140, y: 585, size: t, font, color: c });
  page.drawText(data.placeOfBirth, { x: 420, y: 585, size: t, font, color: c });
  page.drawText(data.town, { x: 95, y: 558, size: t, font, color: c });
  page.drawText(data.state, { x: 230, y: 558, size: t, font, color: c });
  page.drawText(data.nationality, { x: 480, y: 558, size: t, font, color: c });
  page.drawText(data.complexion, { x: 130, y: 532, size: t, font, color: c });
  page.drawText(data.bestHobby, { x: 300, y: 532, size: t, font, color: c });
  page.drawText(data.livingWithParents, { x: 530, y: 532, size: t, font, color: c });
  if(data.reasonsNotLiving) page.drawText(data.reasonsNotLiving, { x: 180, y: 505, size: t, font, color: c });
  page.drawText(data.prevSchoolName, { x: 100, y: 450, size: t, font, color: c });
  page.drawText(data.prevSchoolYears, { x: 450, y: 450, size: t, font, color: c });
  page.drawText(data.fatherName, { x: 140, y: 340, size: t, font, color: c });
  page.drawText(data.fatherOccupation, { x: 170, y: 315, size: t, font, color: c });
  page.drawText(data.fatherOfficeAddress, { x: 200, y: 290, size: t, font, color: c });
  page.drawText(data.fatherHomeAddress, { x: 140, y: 265, size: t, font, color: c });
  page.drawText(data.fatherPhone, { x: 170, y: 240, size: t, font, color: c });
  page.drawText(data.motherName, { x: 140, y: 215, size: t, font, color: c });
  page.drawText(data.motherHomeAddress, { x: 190, y: 190, size: t, font, color: c });
  page.drawText(data.motherPhone, { x: 170, y: 165, size: t, font, color: c });

  return await pdfDoc.save();
}

async function createSecondaryPdf(data: SecondaryFormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // LOAD SECONDARY BG
  const bgPath = path.join(__dirname, 'secondary-form-bg.jpg'); // Change extension if needed
  const bgImageBytes = await fs.readFile(bgPath);
  const bgImage = await pdfDoc.embedJpg(bgImageBytes);

  page.drawImage(bgImage, { x: 0, y: 0, width, height });

  const t = 10;
  const c = rgb(0, 0, 0);

  // --- SECONDARY MAPPING (Estimates - adjust these like you did for primary) ---
  page.drawText(`${data.surname} ${data.otherName}`, { x: 145, y: 635, size: t, font, color: c });
  page.drawText(data.dob, { x: 140, y: 611, size: t, font, color: c });
  page.drawText(data.placeOfBirth, { x: 370, y: 611, size: t, font, color: c });
  page.drawText(data.sex, { x: 85, y: 588, size: t, font, color: c });
  page.drawText(data.stateOfOrigin, { x: 230, y: 588, size: t, font, color: c });
  page.drawText(data.nationality, { x: 400, y: 588, size: t, font, color: c });
  page.drawText(data.religion, { x: 110, y: 564, size: t, font, color: c });

  // Parents
  page.drawText(data.sponsorName, { x: 145, y: 516, size: t, font, color: c });
  page.drawText(data.relationship, { x: 460, y: 516, size: t, font, color: c });
  page.drawText(data.occupation, { x: 130, y: 494, size: t, font, color: c });
  page.drawText(data.sponsorPhone, { x: 290, y: 494, size: t, font, color: c });
  page.drawText(data.sponsorEmail, { x: 408, y: 494, size: t, font, color: c });
  page.drawText(data.businessAddress, { x: 150, y: 472, size: t, font, color: c });
  page.drawText(data.residentialAddress, { x: 150, y: 452, size: t, font, color: c });

  // Table (Previous School)
  page.drawText(data.prevSchoolName, { x: 65, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolDateFrom, { x: 313, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolDateTo, { x: 380, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolClassEntry, { x: 455, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolClassExit, { x: 510, y: 315, size: t, font, color: c });

  // Health
  page.drawText(data.healthConditions, { x: 275, y: 239, size: t, font, color: c });

  return await pdfDoc.save();
}

// --- FINAL PRODUCTION HANDLER ---
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. Only allow POST
  if (request.method !== 'POST') return response.status(405).send('Method Not Allowed');

  try {
    const formData = request.body;
    let pdfBytes;
    let subjectName = "";

    console.log(`--- PROCESSING ${formData.formType.toUpperCase()} APPLICATION ---`);

    // 2. Generate the correct PDF based on type
    if (formData.formType === "secondary") {
      pdfBytes = await createSecondaryPdf(formData);
      subjectName = `${formData.surname} ${formData.otherName}`;
    } else {
      pdfBytes = await createPrimaryPdf(formData);
      subjectName = formData.pupilName;
    }

    // 3. SEND EMAIL VIA RESEND
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'Gods Wisdom Schools <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || ''],
      subject: `New ${formData.formType.toUpperCase()} Admission: ${subjectName}`,
      html: `
        <h2>New Application Received</h2>
        <p>A new <strong>${formData.formType}</strong> school application has been submitted.</p>
        <p><strong>Student Name:</strong> ${subjectName}</p>
        <p>Please find the attached PDF for full details.</p>
      `,
      attachments: [{
        filename: `${formData.formType}_Form_${subjectName.replace(/\s/g, '_')}.pdf`,
        content: Buffer.from(pdfBytes),
      }],
    });

    if (error) {
      console.error('--- RESEND ERROR ---', error);
      return response.status(400).json(error);
    }

    console.log('--- EMAIL SENT SUCCESSFULLY ---', data);

    // 4. Send Success Response
    response.status(200).json({ 
        message: 'Application processed and email sent successfully!' 
    });

  } catch (error) {
    console.error('--- SERVER ERROR ---', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ message: 'Error processing application', error: msg });
  }
}