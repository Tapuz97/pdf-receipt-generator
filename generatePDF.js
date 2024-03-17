$(document).ready(function() {

    //handle user images
    var eventImage = document.getElementById('event_img');
    let imageDataURL = null;
    eventImage.addEventListener("change", async function(event) {
        var file = event.target.files[0];

        if (!file) {
            console.log("No image selected.");
            imageDataURL = null;
            newWidth = null;
            newHeight = null;
            return;
        }
        imageDataURL = await convertImageToBase64(file);
    });

    var eventImage = document.getElementById('qr_img');
    let qreDataURL = null;
    eventImage.addEventListener("change", async function(event) {
        var file = event.target.files[0];
        
        if (!file) {
            console.log("No image selected.");
            imageDataURL = null;
            newWidth = null;
            newHeight = null;
            return;
        }
        qreDataURL = await convertImageToBase64(file);
    });
    


    window.generate_pdf = async function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Generating PDF...');
    try {

        //user input vars//
        var fullName = document.getElementById('full_name').value.trim();
        var idNumber = document.getElementById('id_number').value.trim();
        var phoneNumber = document.getElementById('phone_number').value.trim();
        var emailAddress = document.getElementById('email_address').value.trim();
        emailAddress=reverseString(emailAddress);
        var creditCard = document.getElementById('credit_card').value.trim();
        var cc=`**** **** **** ${reverseString(creditCard.slice(-4))}`;//take only last 4 dig
        cc=reverseString(cc);
        var eventName = document.getElementById('event_name').value.trim();
        var eventDate = document.getElementById('event_date').value.trim();
        var eventTime = document.getElementById('event_time').value.trim();
        var eventPrice = document.getElementById('event_price').value.trim();
        var ticketype = document.getElementById('ticket_type').value.trim();
        var receiptnum = document.getElementById('receipt_number').value.trim();

        // Create a new jsPDF instance
        const doc = new window.jspdf.jsPDF();
        const DavidLibreBase64 = await fontToBase64();

        //handle hebrew add font//
        const callAddFont = function () {
            doc.addFileToVFS('DavidLibre-Regular.ttf', DavidLibreBase64);
            doc.addFont('DavidLibre-Regular.ttf', 'DavidLibre', 'normal');
        };
        
        callAddFont(); // Directly call the function to add the font.
        
        doc.setFont('DavidLibre', 'normal');
        //handle hebrew add font//


        var bodyStyles={
            font: "DavidLibre",
            fontSize: 10,
            cellPadding: 2,
            textColor: 20,
            lineColor: 200,
            lineWidth: 0.2,
            halign: 'right', // Horizontal alignment
            valign: 'middle',// Vertical alignment
            isSymmetricSwapping: true,
            isInputVisual: true,
            isOutputVisual: false,
            cellWidth:"auto"
        };
        var headStyles = {
            font: "DavidLibre",
            fontSize: 12,
            lineWidth: 0,
            fillColor: [128, 128, 128], // RGB color for header background, e.g., light blue
            textColor: 255, // Text color for the header, e.g., white
            fontStyle: 'bold', // Making header text bold
            halign: 'right', // Horizontal alignment
            valign: 'middle',// Vertical alignment
            isSymmetricSwapping: true,
            isInputVisual: true,
            isOutputVisual: false,
            cellWidth:"auto"
        };

        // Get the current date and time in 'Asia/Jerusalem' timezone
        var jerusalemDateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' });

        // Extract the date and time components
        // The format is typically dd/mm/yyyy, hh:mm:ss in 'en-GB' locale
        const [datePart, timePart] = jerusalemDateTime.split(', ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');

        // Format date and time
        const date = `${day}/${month}/${year}`;
        const time = `${hours}:${minutes}`;

        //business info json//
        var business_info={
            head: [['פרטי העסקה', 'פרטי העסק'].map(reverseString)],
            body: [
                ["מספר עמותה: 58-031-983-8",  'אגודת הסטודנטים בראודה'].map(reverseString),
                [`תאריך עסקה: ${date}`, 'מעלה אורט 40'].map(reverseString),
                [`שעת עסקה: ${time}`, 'כרמיאל'].map(reverseString),
                [`מספר חשבון עסקה: ${receiptnum}`,"טל' 049901842"].map(reverseString)],
            headStyles: headStyles,
            bodyStyles: bodyStyles,
        };
        //business info json//

        //customer and payment info json//

        var customer_payment_info={
            head: [["","","פרטי המזמין ואמצעי התשלום"].map(reverseString)],
            body: [
                [`ליימיא: ${emailAddress}`,`טלפון: ${phoneNumber}`,`שם: ${fullName}`].map(reverseString),
                [`סוג פעולה: עסקת אשראי רגילה`,`מס' כרטיס: ${cc}`,`תעודת זהות: ${idNumber}`].map(reverseString)],
            headStyles: headStyles,
            bodyStyles: bodyStyles,
        }; 
        //customer and payment info json//

        //event info json//
        var event_info={
            head: [["","","פרטי האירוע"].map(reverseString)],
            body: [
                [`שעה: ${eventTime}`,`תאריך: ${eventDate}`,`תיאור: ${eventName}`].map(reverseString),
                [`מטבע: ש"ח`,`מחיר: ${eventPrice}`,`סוג כרטיס: ${ticketype}`].map(reverseString)],
            headStyles: headStyles,
            bodyStyles: bodyStyles,
        }; 
        //event info json//
        

        // Use autoTable to add your tables...
        doc.autoTable({
            head: business_info.head,
            body:business_info.body,
            startY:80,
            styles: bodyStyles,
            headStyles:headStyles
        });
        doc.autoTable({
            head: customer_payment_info.head,
            body:customer_payment_info.body,
            startY:doc.lastAutoTable.finalY + 15,
            styles: bodyStyles,
            headStyles:headStyles
        });
        doc.autoTable({
            head: event_info.head,
            body:event_info.body,
            startY:doc.lastAutoTable.finalY + 15,
            styles: bodyStyles,
            headStyles:headStyles
        });
        
        doc.addImage(imageDataURL, 15, 10, 180, 0);
        doc.addImage(qreDataURL, 80, 230, 60, 60);

        // Save the PDF
        doc.save(`BSU_invoice_${receiptnum}.pdf`);
    } catch (error) {
        console.error('Error in PDF generation:', error);
    }
}
});
