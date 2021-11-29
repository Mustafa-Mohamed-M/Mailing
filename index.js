require('dotenv').config();
const nodemailer = require('nodemailer');
const moment = require('moment');
const ical = require('ical-generator');

const sourceEmail = 'mustafa.mohamed.m@outlook.com';
const eventStart = moment('11-23-2021 11:40 PM', 'MM-DD-YYYY hh:mm A');
const eventStop = eventStart.add(1, 'hour');

//Create calendar invite
const content = ical({
    domain: 'google.com',
    method: 'REQUEST',
    prodId: '//Google Inc//Google Calendar 70.9054//EN',
    events: [{
        start: eventStart,
        status: 'CONFIRMED',
        end: eventStop,
        summary: 'Look! It\'s alive!',
        transparency: 'OPAQUE',
        organizer: {
            name: 'Mustafa Mohamed',
            email: sourceEmail,
            mailto: sourceEmail,
        },
        location: 'Boardroom',
        attendees: [{
                email: 'someemail@domain.com',
                name: 'Anthony Phillips',
                status: 'ACCEPTED',
                rsvp: true,
                type: 'INDIVIDUAL',
                role: 'REQ-PARTICIPANT'
            },
            {
                email: 'anotheremail@domain.com',
                name: 'Mike Jack',
                status: 'NEEDS-ACTION',
                type: 'INDIVIDUAL',
                role: 'REQ-PARTICIPANT'
            },

        ]
    }]
}).toString();

const recipientEmail = 'mustafamohamed4014@gmail.com';
// const recipientEmail = 'nicholasguantai528@gmail.com';

async function main() {
    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: sourceEmail,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    let info = await transporter.sendMail({
        from: `Mustafa Mohamed <${sourceEmail}>`,
        to: recipientEmail,
        subject: 'Email from Node application',
        text: 'This email was sent to you from a node application. :)',
        html: `<table>
        <tbody>
            <tr>
                <td>
                    <h3>The event</h3>
                </td>
                <td>
                    Organized by Mustafa Mohamed
                </td>
            </tr>
            <tr>
                <td colspan="2">
                <span style="color:red; "  >
                    We think the <i>event</i> <em>below</em> will be good for your consumption. We hope to see you there.
                    <a href="www.google.com">Some link for testing</a>
                </span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button  style="border-radius:5px; color:white; background:black;" >Event location</button>
                </td>
            </tr>
        </tbody>
        <p>
            You are requested to bring with you the following items.
            <ul>    
                <li>A spoon</li>
                <li>A bottle of water</li>
            </ul>
        </p>
        <p>You may come with at most <span style="color:red">one</span> person.</p>
    </table>`,
        icalEvent: {
            content: content,
        },
    });
    // console.log(info.messageId);
    console.log(`Message sent to ${recipientEmail}. It has id ${info.messageId}`);
}

main().catch(console.error);