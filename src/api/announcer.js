const {google} = require('googleapis');
const {PLACES, PEOPLE_COUNT, ABSENT_PEOPLE, sheetsLink, sheetsId, slackHook, slackUsers} = require('./constants.js');

const place = PLACES[0];

const Slack = require('node-slack');
const slack = new Slack(slackHook,{});


const announce = (auth) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: sheetsId,
        range: place + "!A2:B" + (PEOPLE_COUNT + 2),
    }, (err, res) => {
        const rows = res.data.values;
        console.log(rows[rows.length - 1]);
        let message = "Salut. Maine o sa comandam de la <" + rows[rows.length - 1][1] + "|" + place + ">.";
        message += "\nDaca doriti sa va schimbati defaulturile intrati <" + sheetsLink + "|aici>.\nComanda este urmatoarea:";
        for (const row of rows) {
            if (!row[0] || ABSENT_PEOPLE.find(r => r === row[0])) {
                continue;
            }
            message += "\n<@" + slackUsers[row[0].toLowerCase()] + "> " + (row[1] || "");
        }
        slack.send({
            text: message,
            channel: '#food',
        });

        console.log(message);
    });
};

module.exports = announce;