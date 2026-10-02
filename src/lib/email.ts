import FormData from "form-data";
import Mailgun from "mailgun.js";
import { Resend } from "resend";
import { Order } from "@/types";

interface SendEmailParams {
  order: Order;
  recipientEmail: string;
  recipientName: string;
}

// Generate the Heritage Harvest HTML Email Receipt
function generateOrderReceiptHtml(order: Order, recipientName: string): string {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const itemsRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #EADBCE;">
          <div style="font-weight: 600; color: #1E2822; font-size: 15px;">${item.product.title}</div>
          <div style="font-size: 13px; color: #71717A;">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
        </td>
        <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #EADBCE; font-weight: 600; color: #1E2822; font-size: 15px;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Kemi's Artisan Pantry</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FBF8F3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E2822;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF8F3; padding: 40px 15px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #EADBCE; overflow: hidden; box-shadow: 0 4px 12px rgba(44, 74, 62, 0.05);">
              
              <!-- Header with Heritage Harvest Olive -->
              <tr>
                <td style="background-color: #2C4A3E; padding: 32px 30px; text-align: center;">
                  <h1 style="color: #FBF8F3; margin: 0 0 6px 0; font-family: Georgia, serif; font-size: 26px; letter-spacing: 0.5px;">Kemi's Artisan Pantry</h1>
                  <p style="color: #E5ECE7; margin: 0; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase;">Small-Batch Kitchen & Provisions</p>
                </td>
              </tr>

              <!-- Hero Greeting -->
              <tr>
                <td style="padding: 30px 30px 10px 30px;">
                  <div style="background-color: #FAECE5; border: 1px solid #D48263; color: #AB593A; display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px;">
                    Order Confirmed
                  </div>
                  <h2 style="margin: 0 0 10px 0; color: #1E2822; font-family: Georgia, serif; font-size: 22px;">
                    Thank you for your order, ${recipientName}!
                  </h2>
                  <p style="margin: 0; color: #4B5563; font-size: 15px; line-height: 1.6;">
                    Auntie Kemi and our kitchen crew have received your request. We are carefully packing your small-batch provisions with love and care.
                  </p>
                </td>
              </tr>

              <!-- Order Summary Meta Box -->
              <tr>
                <td style="padding: 20px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF8F3; border-radius: 8px; padding: 16px; border: 1px solid #EADBCE;">
                    <tr>
                      <td width="50%" style="font-size: 13px; color: #71717A;">
                        <strong style="color: #2C4A3E; display: block; font-size: 14px; margin-bottom: 2px;">Order Number:</strong>
                        ${order.id}
                      </td>
                      <td width="50%" align="right" style="font-size: 13px; color: #71717A;">
                        <strong style="color: #2C4A3E; display: block; font-size: 14px; margin-bottom: 2px;">Date Placed:</strong>
                        ${formattedDate}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Items Table -->
              <tr>
                <td style="padding: 0 30px 20px 30px;">
                  <h3 style="margin: 0 0 12px 0; color: #2C4A3E; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #2C4A3E; padding-bottom: 6px;">
                    Purchased Provisions
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${itemsRows}
                  </table>
                </td>
              </tr>

              <!-- Totals Breakdown -->
              <tr>
                <td style="padding: 0 30px 24px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                    <tr>
                      <td style="padding: 4px 0; color: #6B7280; font-size: 14px;">Subtotal</td>
                      <td style="padding: 4px 0; text-align: right; color: #1E2822; font-size: 14px; font-weight: 500;">
                        $${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; color: #6B7280; font-size: 14px;">Shipping (Standard Kitchen Courier)</td>
                      <td style="padding: 4px 0; text-align: right; color: #047857; font-size: 14px; font-weight: 600;">
                        FREE
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0 4px 0; border-top: 2px solid #1E2822; font-size: 18px; font-weight: 700; color: #2C4A3E; font-family: Georgia, serif;">Total Paid</td>
                      <td style="padding: 12px 0 4px 0; border-top: 2px solid #1E2822; text-align: right; font-size: 18px; font-weight: 700; color: #C26D4D;">
                        $${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Delivery Destination -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <div style="background-color: #F8FAFC; border-radius: 8px; padding: 18px; border: 1px solid #E2E8F0;">
                    <h4 style="margin: 0 0 6px 0; color: #2C4A3E; font-size: 14px; text-transform: uppercase;">Delivery Address</h4>
                    <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
                      <strong>${order.customerName}</strong><br>
                      ${order.address}<br>
                      ${order.city}, ${order.state} ${order.postalCode}<br>
                      ${order.country}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer Note -->
              <tr>
                <td style="background-color: #FBF8F3; padding: 24px 30px; text-align: center; border-top: 1px solid #EADBCE; color: #71717A; font-size: 12px; line-height: 1.6;">
                  <p style="margin: 0 0 6px 0;">Questions about your batch? Reply directly to this email or reach us at <strong style="color: #2C4A3E;">help@kemisartisanpantry.com</strong></p>
                  <p style="margin: 0;">Kemi's Artisan Pantry & Provisions • HNG 15 Official Showcase</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function sendOrderConfirmationEmail({
  order,
  recipientEmail,
  recipientName,
}: SendEmailParams): Promise<{ success: boolean; provider: string; error?: string }> {
  const subject = `Order Confirmation #${order.id.slice(-6).toUpperCase()} — Kemi's Artisan Pantry`;
  const htmlContent = generateOrderReceiptHtml(order, recipientName);

  // Strategy 1: Check Resend (Fastest, zero sandbox hassle)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.MAIL_FROM || "Kemi's Pantry <onboarding@resend.dev>";
      
      const res = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject,
        html: htmlContent,
      });

      if (res.error) {
        console.warn("[Resend Warning]:", res.error);
      } else {
        console.log(`[Email Success] Confirmation sent to ${recipientEmail} via Resend.`);
        return { success: true, provider: "resend" };
      }
    } catch (err: any) {
      console.error("[Resend Error]:", err?.message || err);
    }
  }

  // Strategy 2: Check Mailgun (Official HNG Lesson 2 Requirement)
  if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    try {
      const mailgun = new Mailgun(FormData);
      const mg = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY,
        url: process.env.MAILGUN_HOST ? `https://${process.env.MAILGUN_HOST}` : "https://api.mailgun.net",
      });

      const fromAddress =
        process.env.MAIL_FROM || `Kemi's Artisan Pantry <orders@${process.env.MAILGUN_DOMAIN}>`;

      await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: fromAddress,
        to: [recipientEmail],
        subject,
        html: htmlContent,
      });

      console.log(`[Email Success] Confirmation sent to ${recipientEmail} via Mailgun.`);
      return { success: true, provider: "mailgun" };
    } catch (err: any) {
      console.error("[Mailgun Error]:", err?.message || err);
      // If Mailgun rejected due to sandbox unverified recipient, log an informative explanation
      if (err?.message?.includes("sandbox") || err?.status === 403) {
        console.warn(
          "[Mailgun Sandbox Notice] Mailgun Sandbox requires adding the recipient under 'Authorized Recipients' in the Mailgun dashboard."
        );
      }
      return { success: false, provider: "mailgun", error: err?.message || "Failed to send via Mailgun" };
    }
  }

  // Strategy 3: Mock / Local dev fallback
  console.log(
    `[Mock Email Service] Order receipt simulated for ${recipientEmail}. Set MAILGUN_API_KEY or RESEND_API_KEY in .env.local to send live emails.`
  );
  return { success: true, provider: "mock" };
}
