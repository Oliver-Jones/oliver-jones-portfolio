function generateResume(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;
    const MARGIN = 20;
    const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
    let y = MARGIN;

    const COLORS = {
        heading: [15, 23, 42],
        text: [51, 65, 85],
        accent: [37, 99, 235],
        light: [100, 116, 139],
        rule: [226, 232, 240]
    };

    function checkPageBreak(needed) {
        if (y + needed > PAGE_HEIGHT - MARGIN) {
            doc.addPage();
            y = MARGIN;
            return true;
        }
        return false;
    }

    function drawRule() {
        doc.setDrawColor(...COLORS.rule);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
        y += 6;
    }

    function sectionTitle(title) {
        checkPageBreak(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...COLORS.accent);
        doc.text(title.toUpperCase(), MARGIN, y);
        y += 2;
        doc.setDrawColor(...COLORS.accent);
        doc.setLineWidth(0.5);
        doc.line(MARGIN, y, MARGIN + 40, y);
        y += 6;
    }

    function wrapText(text, maxWidth, fontSize) {
        doc.setFontSize(fontSize);
        return doc.splitTextToSize(text, maxWidth);
    }

    // ===== Header =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...COLORS.heading);
    doc.text(data.name, MARGIN, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...COLORS.accent);
    doc.text(data.title, MARGIN, y);
    y += 8;

    // Contact line
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.light);
    const contactParts = [];
    if (data.contact.email) contactParts.push(data.contact.email);
    if (data.contact.phone) contactParts.push(data.contact.phone);
    if (data.contact.links) {
        data.contact.links.forEach(link => contactParts.push(link.label + ': ' + link.url));
    }
    const contactLine = wrapText(contactParts.join('  |  '), CONTENT_WIDTH, 9);
    doc.text(contactLine, MARGIN, y);
    y += contactLine.length * 4 + 4;

    drawRule();

    // ===== Summary =====
    sectionTitle('Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.text);
    data.about.forEach(paragraph => {
        const lines = wrapText(paragraph, CONTENT_WIDTH, 9.5);
        checkPageBreak(lines.length * 4 + 4);
        doc.text(lines, MARGIN, y);
        y += lines.length * 4 + 3;
    });
    y += 3;

    // ===== Skills =====
    sectionTitle('Skills');
    data.skills.forEach(group => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...COLORS.heading);
        doc.text(group.category, MARGIN, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.text);
        const skillText = group.items.join('  •  ');
        const lines = wrapText(skillText, CONTENT_WIDTH - 4, 9);
        doc.text(lines, MARGIN + 4, y);
        y += lines.length * 3.8 + 4;
    });
    y += 2;

    // ===== Experience =====
    sectionTitle('Experience');
    data.experience.forEach(job => {
        checkPageBreak(20);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...COLORS.heading);
        doc.text(job.role, MARGIN, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.accent);
        doc.text(job.date, PAGE_WIDTH - MARGIN, y, { align: 'right' });
        y += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.light);
        doc.text(job.company, MARGIN, y);
        y += 5;

        doc.setFontSize(9);
        doc.setTextColor(...COLORS.text);
        job.points.forEach(point => {
            const lines = wrapText(point, CONTENT_WIDTH - 6, 9);
            checkPageBreak(lines.length * 3.8 + 2);
            doc.text('•', MARGIN + 2, y);
            doc.text(lines, MARGIN + 6, y);
            y += lines.length * 3.8 + 1.5;
        });
        y += 4;
    });

    // ===== Projects =====
    sectionTitle('Projects');
    data.projects.forEach(proj => {
        checkPageBreak(14);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...COLORS.heading);

        const nameLines = wrapText(proj.name, CONTENT_WIDTH - 50, 9.5);
        doc.text(nameLines, MARGIN, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.accent);
        doc.text(proj.date, PAGE_WIDTH - MARGIN, y, { align: 'right' });
        y += nameLines.length * 4 + 1;

        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.text);
        const descLines = wrapText(proj.description, CONTENT_WIDTH, 8.5);
        checkPageBreak(descLines.length * 3.5 + 2);
        doc.text(descLines, MARGIN, y);
        y += descLines.length * 3.5 + 1;

        doc.setFontSize(8);
        doc.setTextColor(...COLORS.light);
        doc.text(proj.tags.join('  •  '), MARGIN, y);
        y += 6;
    });

    // ===== Certifications =====
    sectionTitle('Certifications');
    const certColWidth = CONTENT_WIDTH / 2;
    let certCol = 0;
    let certStartY = y;

    data.certifications.forEach((cert, i) => {
        const colX = MARGIN + certCol * certColWidth;
        checkPageBreak(8);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.heading);
        doc.text(cert.name, colX, y);
        y += 3.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.light);
        const issuerDate = (cert.issuer || '') + '  •  ' + cert.date;
        doc.text(issuerDate, colX, y);
        y += 5;

        if (certCol === 0 && i < data.certifications.length - 1) {
            certCol = 1;
            y = certStartY;
        } else {
            certCol = 0;
            certStartY = y;
        }
    });
    if (certCol === 1) y = certStartY;
    y += 4;

    // ===== Education =====
    sectionTitle('Education');
    data.education.forEach(edu => {
        checkPageBreak(14);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...COLORS.heading);
        doc.text(edu.degree, MARGIN, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.accent);
        doc.text(edu.period + '  •  ' + edu.grade, PAGE_WIDTH - MARGIN, y, { align: 'right' });
        y += 5;

        doc.setTextColor(...COLORS.light);
        doc.text(edu.school, MARGIN, y);
        y += 8;
    });

    doc.save(data.name.replace(/\s+/g, '_') + '_Resume.pdf');
}
