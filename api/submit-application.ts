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
  agreedToRules: boolean;
  medicalNoteAcknowledged: boolean;
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
  agreedToTerms: boolean;
}

// --- HELPER TO CONVERT DATA TO UPPERCASE (Typed properly to fix line 67/68) ---
function formatDataToUppercase(data: Record<string, unknown>) {
  const formatted: Record<string, unknown> = {};
  for (const key in data) {
    const value = data[key];
    if (typeof value === 'string' && !key.toLowerCase().includes('email')) {
      formatted[key] = value.toUpperCase();
    } else {
      formatted[key] = value;
    }
  }
  return formatted;
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

  const textSize = 11; 
  const textColor = rgb(0, 0, 0); 

  page.drawText(data.pupilName, { x: 140, y: 641, size: textSize, font, color: textColor });
  page.drawText(data.homeAddress, { x: 142, y: 625, size: textSize, font, color: textColor });
  page.drawText(data.dob, { x: 140, y: 608, size: textSize, font, color: textColor });
  page.drawText(data.placeOfBirth, { x: 360, y: 608, size: textSize, font, color: textColor });
  page.drawText(data.town, { x: 85, y: 593, size: textSize, font, color: textColor });
  page.drawText(data.state, { x: 180, y: 593, size: textSize, font, color: textColor });
  page.drawText(data.nationality, { x: 380, y: 593, size: textSize, font, color: textColor });
  page.drawText(data.complexion, { x: 115, y: 576, size: textSize, font, color: textColor });
  page.drawText(data.bestHobby, { x: 225, y: 576, size: textSize, font, color: textColor });
  const livingStatus = data.livingWithParents === 'YES' ? 'YES' : 'NO';
  page.drawText(livingStatus, { x: 480, y: 576, size: textSize, font, color: textColor });

  if (data.reasonsNotLiving) {
    page.drawText(data.reasonsNotLiving, { x: 180, y: 560, size: textSize, font, color: textColor });
  }

  page.drawText(data.prevSchoolName, { x: 80, y: 512, size: textSize, font, color: textColor });
  page.drawText(data.prevSchoolYears, { x: 380, y: 512, size: textSize, font, color: textColor });
  page.drawText(data.pupilName, { x: 50, y: 447, size: textSize, font, color: textColor });

  page.drawText(data.fatherName, { x: 140, y: 364, size: textSize, font, color: textColor });
  page.drawText(data.fatherOccupation, { x: 170, y: 348, size: textSize, font, color: textColor });
  page.drawText(data.fatherOfficeAddress, { x: 170, y: 331, size: textSize, font, color: textColor });
  page.drawText(data.fatherHomeAddress, { x: 140, y: 300, size: textSize, font, color: textColor });
  page.drawText(data.fatherPhone, { x: 170, y: 285, size: textSize, font, color: textColor });

  page.drawText(data.motherName, { x: 140, y: 268, size: textSize, font, color: textColor });
  page.drawText(data.motherHomeAddress, { x: 170, y: 252, size: textSize, font, color: textColor });
  page.drawText(data.motherPhone, { x: 150, y: 220, size: textSize, font, color: textColor });

  const today = new Date().toLocaleDateString();
  page.drawText(today, { x: 450, y: 152, size: 10, font, color: textColor });
  page.drawText(today, { x: 450, y: 136, size: 10, font, color: textColor });
  page.drawText(today, { x: 450, y: 120, size: 10, font, color: textColor });

  return await pdfDoc.save();
}

async function createSecondaryPdf(data: SecondaryFormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const bgPath = path.join(__dirname, 'secondary-form-bg.jpg'); 
  const bgImageBytes = await fs.readFile(bgPath);
  const bgImage = await pdfDoc.embedJpg(bgImageBytes);

  page.drawImage(bgImage, { x: 0, y: 0, width, height });

  const t = 10;
  const c = rgb(0, 0, 0);

  page.drawText(`${data.surname} ${data.otherName}`, { x: 145, y: 635, size: t, font, color: c });
  page.drawText(data.dob, { x: 140, y: 611, size: t, font, color: c });
  page.drawText(data.placeOfBirth, { x: 370, y: 611, size: t, font, color: c });
  page.drawText(data.sex, { x: 85, y: 588, size: t, font, color: c });
  page.drawText(data.stateOfOrigin, { x: 230, y: 588, size: t, font, color: c });
  page.drawText(data.nationality, { x: 400, y: 588, size: t, font, color: c });
  page.drawText(data.religion, { x: 110, y: 564, size: t, font, color: c });

  page.drawText(data.sponsorName, { x: 145, y: 516, size: t, font, color: c });
  page.drawText(data.relationship, { x: 460, y: 516, size: t, font, color: c });
  page.drawText(data.occupation, { x: 130, y: 494, size: t, font, color: c });
  page.drawText(data.sponsorPhone, { x: 290, y: 494, size: t, font, color: c });
  page.drawText(data.sponsorEmail, { x: 408, y: 494, size: t, font, color: c });
  page.drawText(data.businessAddress, { x: 150, y: 472, size: t, font, color: c });
  page.drawText(data.residentialAddress, { x: 150, y: 452, size: t, font, color: c });

  page.drawText(data.prevSchoolName, { x: 65, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolDateFrom, { x: 313, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolDateTo, { x: 380, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolClassEntry, { x: 455, y: 315, size: t, font, color: c });
  page.drawText(data.prevSchoolClassExit, { x: 510, y: 315, size: t, font, color: c });

  page.drawText(data.healthConditions, { x: 275, y: 239, size: t, font, color: c });

  return await pdfDoc.save();
}

// --- FINAL PRODUCTION HANDLER ---
export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).send('Method Not Allowed');

  try {
    const rawData = request.body as Record<string, unknown>;
    const formData = formatDataToUppercase(rawData) as unknown as (PrimaryFormData | SecondaryFormData);
    
    let pdfBytes;
    let subjectName = "";

    if (formData.formType === "secondary") {
      pdfBytes = await createSecondaryPdf(formData as SecondaryFormData);
      subjectName = `${(formData as SecondaryFormData).surname} ${(formData as SecondaryFormData).otherName}`;
    } else {
      pdfBytes = await createPrimaryPdf(formData as PrimaryFormData);
      subjectName = (formData as PrimaryFormData).pupilName;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Removed unused 'data' variable to fix line 203
    const { error } = await resend.emails.send({
      from: 'Gods Wisdom Schools <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || ''],
      subject: `New Admission (${formData.formType}): ${subjectName}`,
      html: `<p>New application received for <strong>${formData.formType}</strong> school.</p>`,
      attachments: [{
        filename: `${formData.formType}_Form_${subjectName.replace(/\s/g, '_')}.pdf`,
        content: Buffer.from(pdfBytes),
      }],
    });

    if (error) {
      console.error('--- RESEND ERROR ---', error);
      return response.status(400).json(error);
    }

    response.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error('--- SERVER ERROR ---', error);
    response.status(500).json({ message: 'Error' });
  }
}