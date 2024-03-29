/*
    * 
    * Build A Resume Server Service to Create Resumes
    * We use Office Clippy, a JS framework to create documents
*/

module.exports = function (app,mongooseAPI) {

    var fs = require('fs');
    var Promise = require('es6-promise').Promise;
    var officeClippy = require('office-clippy');
    var ResumeModel = mongooseAPI.resumeModelAPI;
    var auth = authorized;
    app.post("/api/getResumeData/:uid",auth, createDoc);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function createDoc(req, res) {
        var random = Math.random().toString(36).slice(-8);
        var userId = req.params.uid;
        var filename = userId.toString() + "_" + random.toString();
        var data = req.body;
        createDocHelper(req, res,data,filename,userId);
    }

    function createDocHelper(req, res,data,filename,userId) {
        var docx = officeClippy.docx;
        var doc = docx.create();
        var title = docx.createText(data['user']['firstName'] + " " + data['user']['lastName']);
        title.bold();
        title.allCaps();
        var paragraph = docx.createParagraph();
        paragraph.addText(title)
        paragraph.title().center();
        doc.addParagraph(paragraph);
        var tempList = [];
        if (data['user']['contact']) {
            tempList.push(data['user']['contact'])
        }
        if (data['user']['email']) {
            tempList.push(data['user']['email'])
        }
        if (data['user']['githubUrl']) {
            tempList.push(data['user']['githubUrl'])
        }
        var info = docx.createText(tempList.join(" | "))
        var paragraph = docx.createParagraph()
        paragraph.addText(info);
        paragraph.center().thematicBreak();
        doc.addParagraph(paragraph);
        var education = docx.createText("EDUCATION")
        education.bold()
        var paragraph = docx.createParagraph()
        paragraph.addText(education).thematicBreak();
        paragraph.heading1();
        doc.addParagraph(paragraph);
        var x = data['technical']['technologies'].length;
        var a = data['technical']['languages'].length;
        var b = data['technical']['softwares'].length;
        var c = data['technical']['database'].length;
        var d = data['technical']['operatingSystems'].length;
        for (var i = 0; i < data['education'].length; i++) {
            var tabStop = docx.createMaxRightTabStop();
            var paragraph = docx.createParagraph().addTabStop(tabStop);
            var leftText = docx.createText(data['education'][i]['school']).bold();
            var rightText = docx.createText(data['education'][i]['startYear'] + " – " + data['education'][i]['endYear']).tab();
            paragraph.addText(leftText);
            paragraph.addText(rightText);
            var college = docx.createText(data['education'][i]['degree'] + " in " + data['education'][i]['field'])
            var degree_date = docx.createText("GPA: " + data['education'][i]['grade']).tab();
            college.break();
            paragraph.addText(college);
            paragraph.addText(degree_date);
            var course = docx.createText("Relevant Courses: " + data['education'][i]['courses'].join(", "));
            course.break();
            paragraph.addText(course)
            doc.addParagraph(paragraph);
        }
        if (x != 0 || a != 0 || b != 0 || c != 0 || d != 0) {

            var education = docx.createText("TECHNICAL KNOWLEDGE")
            education.bold()
            var paragraph = docx.createParagraph()
            paragraph.addText(education).thematicBreak();
            paragraph.heading1();
            doc.addParagraph(paragraph);
        }
        var tabStop = docx.createLeftTabStop(2700);
        var paragraph1 = docx.createParagraph().addTabStop(tabStop);
        if (a != 0){

            var lang = docx.createText("Languages:").bold()
            var list_lang = docx.createText(data['technical']['languages'].join(", ")).tab();
            paragraph1.addText(lang);
            paragraph1.addText(list_lang.allCaps());
        }
        if (x != 0) {
            var lang = docx.createText("Technologies:").bold().break()
            var list_lang = docx.createText(data['technical']['technologies'].join(", ")).tab();
            paragraph1.addText(lang)
            paragraph1.addText(list_lang.allCaps());
        }
        if(b != 0) {
            var lang = docx.createText("Software:").bold().break()
            var list_lang = docx.createText(data['technical']['softwares'].join(", ")).tab();
            paragraph1.addText(lang);
            paragraph1.addText(list_lang.allCaps());
        }
        if(c != 0) {

            var lang = docx.createText("Skills:").bold().break()
            var list_lang = docx.createText(data['technical']['database'].join(", ")).tab();
            paragraph1.addText(lang);
            paragraph1.addText(list_lang.allCaps());

        }
        if(d != 0) {
            var lang = docx.createText("Operating Systems:").bold().break()
            var list_lang = docx.createText(data['technical']['operatingSystems'].join(", ")).tab();
            paragraph1.addText(lang);
            paragraph1.addText(list_lang.allCaps());

        }
        doc.addParagraph(paragraph1)

                var education = docx.createText("WORK EXPERIENCE")
                education.bold()
                var paragraph = docx.createParagraph()
                paragraph.addText(education).thematicBreak();
                paragraph.heading1();
                doc.addParagraph(paragraph);
                for (var j1 = 0; j1 < data['work'].length; j1++) {
                    var tabStop = docx.createMaxRightTabStop();
                    var paragraph = docx.createParagraph().addTabStop(tabStop);
                    var leftText = docx.createText(data['work'][j1]['companyName'] + ", " + data['work'][j1]['location']).bold();
                    var rightText = docx.createText(data['work'][j1]['startDate'] + " – " + data['work'][j1]['endDate']).tab();
                    paragraph.addText(leftText);
                    paragraph.addText(rightText);
                    var position = docx.createText(data['work'][j1]['jobTitle']).bold().break();
                    paragraph.addText(position);
                    doc.addParagraph(paragraph);
                    var listDes = []
                    if (data['work'][j1]['description'] != null || data['work'][j1]['description'] != undefined) {
                        listDes = data['work'][j1]['description'].split("\n")
                        for (var k = 0; k < listDes.length; k++) {
                            var text = docx.createText(listDes[k]);
                            var paragraph = docx.createParagraph().bullet();
                            paragraph.addText(text)
                            doc.addParagraph(paragraph);
                        }
                    }
                   
                }
                var education = docx.createText("PROJECTS")
                education.bold()
                var paragraph = docx.createParagraph()
                paragraph.addText(education).thematicBreak();
                paragraph.heading1();
                doc.addParagraph(paragraph);
                for (var j = 0; j < data['project'].length; j++) {
                    var paragraph = docx.createParagraph();
                    var project_name = docx.createText(data['project'][j]['title'] + " (" + data['project'][j]['technologies'].join(" ") + ")").bold().break();
                    paragraph.addText(project_name);
                    doc.addParagraph(paragraph);

                    var proDes = data['project'][j]['description'].split("\n")

                    for (var k = 0; k < proDes.length; k++) {
                        var text = docx.createText(proDes[k])
                        var paragraph = docx.createParagraph();
                        paragraph.addText(text)
                        doc.addParagraph(paragraph);
                    }
                }
                var output = fs.createWriteStream(__dirname + '/../../uploads/docx/' + filename + '.docx');
                var exporter = officeClippy.exporter;
                exporter.local(output, doc);
                output.on('finish', function () {
                    createPDF(req, res,filename,userId);
                });
    }


    function createPDF(userReq, userRes,filename,userId) {
        var req = require('request');
        req = req.defaults({
            agent: false
        });
        function a(buf, callback) {
            var r = req.post('http://mirror1.convertonlinefree.com', {
                encoding: null,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36'
                }
            }, function (err, res) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, res.body);
                }
            });
            var form = r.form();
            form.append('__EVENTTARGET', '');
            form.append('__EVENTARGUMENT', '');
            form.append('__VIEWSTATE', '');
            form.append('ctl00$MainContent$fu', buf, {
                filename: 'output.docx',
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });
            form.append('ctl00$MainContent$btnConvert', 'Convert');
            form.append('ctl00$MainContent$fuZip', '');
        };
        a(fs.readFileSync(__dirname + '/../../uploads/docx/'+filename+'.docx'), function (err, data) {
            fs.writeFileSync(__dirname+'/../../uploads/pdf/' + filename + '.pdf', data);
            addResume(userReq,userRes,filename,userId)
        });
    }

    function addResume(req,res,filename,userId) {
        var resume = {
            "filename": filename
        }
        ResumeModel
            .createResume(userId,resume)
            .then(function (resume) {
                if(null == resume){
                    res.sendStatus(500).send("The resume was not found.");
                }
                else {
                    res.json(resume)
                }
            },function (err) {
                logger.error("Unable to find resumes for user ID:" + userId + " Error: " + err);
                res.send(err);
            });
    }
}
