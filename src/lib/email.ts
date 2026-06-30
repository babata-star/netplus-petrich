import nodemailer from "nodemailer";

/**
 * Имейл изпращане през SMTP (nodemailer).
 * Ако SMTP не е конфигуриран, тихо пропускаме (за локална разработка).
 */
async function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: (Number(SMTP_PORT) || 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

const FROM = process.env.SMTP_FROM || "netplus.petrich@gmail.com";

/** Изпраща имейл; връща true при успех. */
export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    if (!transporter) {
      console.warn(`📧 [email skipped — no SMTP] To: ${to}, Subject: ${subject}`);
      return false;
    }
    await transporter.sendMail({ from: FROM, to, subject, text, html });
    return true;
  } catch (e) {
    console.error("Email send error:", e);
    return false;
  }
}

/** Известява екипа за нова заявка. */
export async function notifyTeamNewRequest(data: {
  name: string;
  phone: string;
  service: string;
  address: string;
}) {
  return sendMail({
    to: FROM,
    subject: `Нова заявка: ${data.name} — ${data.service}`,
    text: `Нова заявка от ${data.name}\nТелефон: ${data.phone}\nАдрес: ${data.address}\nУслуга: ${data.service}`,
  });
}

/** Потвърждение към клиента за подаден сигнал. */
export async function notifyClientTicket({
  email,
  subject,
  ticketId,
}: {
  email: string;
  subject: string;
  ticketId: string;
}) {
  return sendMail({
    to: email,
    subject: `Получихме вашия сигнал: ${subject}`,
    text: `Здравейте,\n\nПолучихме вашия сигнал "${subject}" (реф. ${ticketId}).\nНашият екип ще го разгледа и ще се свърже с вас.\n\nПоздрави,\nЕкипът на НЕТПЛЮС`,
  });
}
