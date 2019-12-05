const {google} = require('googleapis');
const {PEOPLE_COUNT, PLACE, sheetsLink, sheetsId, slackHook, slackUsers} = require('./constants.js');

const Slack = require('node-slack');
const slack = new Slack(slackHook,{});

const announce = (auth) => {
    const absentPeople = process.argv.slice(2);

    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: sheetsId,
        range: PLACE + "!A2:B" + (PEOPLE_COUNT + 2),
    }, (err, res) => {
        const rows = res.data.values;
        console.log(rows[rows.length - 1]);
        let message = "Salut. Azi o sa comandam de la <" + rows[rows.length - 1][1] + "|" + PLACE + ">.";
        message += "\nDaca doriti sa va schimbati defaulturile intrati <" + sheetsLink + "|aici>.\nComanda este urmatoarea:";
        for (const row of rows) {
            if (!row[0] || absentPeople.find(r => row[0].toLowerCase().match(r.toLowerCase()))) {
                continue;
            }
            message += "\n<@" + slackUsers[row[0].toLowerCase()] + "> " + (row[1] || "");
        }
        // slack.send({
        //     text: message,
        //     channel: '#food',
        // });

        console.log(message);
    });
};

module.exports = announce;