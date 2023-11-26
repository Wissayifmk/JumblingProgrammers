function submitForm() {
    if (validateForm()) {
        alert('Form has been submitted successfully.');
        Print();
 
        // To update and display the children data
        var newChild = {
            name: document.querySelector('input[name="Fname"]').value.trim() + ' ' + document.querySelector('input[name="lname"]').value.trim(),
            picture: null, 
        };
 
        var fileInput = document.querySelector('input[type="file"]');
        var file = fileInput.files[0]; 
 
        var readerPhoto = new FileReader();
        readerPhoto.onload = function (event) {
            newChild.picture = event.target.result; 
            // Retrieve and add the new child to display them
            var existingChildrenData = JSON.parse(localStorage.getItem('parentChildren')) || [];
             existingChildrenData.push(newChild);
            localStorage.setItem('parentChildren', JSON.stringify(existingChildrenData));
             displayChildren(existingChildrenData);
        };
 
        readerPhoto.readAsDataURL(file); 
 
    }
    return false; // Prevents the default form submission
}
 
 
 
 
function validateForm() {
    var firstName = document.querySelector('input[name="Fname"]').value.trim();
    var lastName = document.querySelector('input[name="lname"]').value.trim();
    var age = document.querySelector('input[name="Age"]').value;
    var gender = document.querySelector('select[name="Gender"]').value;
    var email = document.querySelector('input[type="email"]').value.trim();
    var phoneNumber = document.querySelector('input[type="tel"]').value.trim();
    var picture = document.querySelector('input[type="file"]').value;
 
    //Check empty fields
	if (gender === "Select Gender") {
    	alert("Please select a gender");
    	return false;
	}

	if (!firstName) {
    	alert("Please fill in the First Name field");
    	return false;
	}
	if (!lastName) {
    	alert("Please fill in the Last Name field");
		return false;
	}
	if (!age) {
    	alert("Please fill in the Age field");
    	return false;
	}
	if (!email) {
    	alert("Please fill in the Email field");
    	return false;
	}
	if (!phoneNumber) {
    	alert("Please fill in the Phone Number field");
    	return false;
	}
	if (!picture) {
    	alert("Please upload a picture");
    	return false;
	}
  
            
    //Check start of the name
    if (/^\d/.test(firstName)) {
        alert('First name must not start with a number');
        return false;
    }
    if (/^\d/.test(lastName)) {
        alert('Last name must not start with a number');
        return false;
    }
 
    // Check the phone number is 10 digits only
    if (!(/^\d{10}$/.test(phoneNumber))) {
        alert('Phone number needs to be exactly 10 digits');
        return false;
    }
 
    // Check if the child is younger than 6 years old
    var currentYear = new Date().getFullYear();
    if ((currentYear - new Date(age).getFullYear()) < 6) {
        alert('Children below the age of six are not accepted');
    return false;
    }
                return true;
                }
 
    document.querySelector('form').addEventListener('submit', function (event) {
 
});
 
function Print() {
    var Name = document.querySelector('input[name="Fname"]').value.trim() + ' ' + document.querySelector('input[name="lname"]').value.trim();
    var DOB = document.querySelector('input[name="Age"]').value;
    var Gender = document.querySelector('select[name="Gender"]').value;
    var Email = document.querySelector('input[type="email"]').value.trim();
    var PhoneNumber = document.querySelector('input[type="tel"]').value.trim();
    var Photo = document.querySelector('input[type="file"]').files[0];
 
    var printWindow = window.open('', '_blank');
 
    var PrintInfo = '<div style="border: 0.125em solid #000; padding: 2%;">';
    if (Photo) {
        var reader = new FileReader();
        reader.onload = function (e) {
            PrintInfo += ' <img src="' + e.target.result + '" alt=" " style="max-width: 20%;"></p>';
            printRestOfInformation();
        };
        reader.readAsDataURL(Photo);
    } else {
        printRestOfInformation();
    }
 
    function printRestOfInformation() {
        PrintInfo += '<p>Name: ' + Name + '</p>';
        PrintInfo += '<p>DOB: ' + DOB + '</p>';
        PrintInfo += '<p>Gender: ' + Gender + '</p>';
        PrintInfo += '<p>Phone Number: ' + PhoneNumber + '</p>';
        PrintInfo += '<p>Email: ' + Email + '</p>';
        PrintInfo += '</div>';
 
        printWindow.document.write(PrintInfo);
        printWindow.document.close();
 
        //To be sure that the image is uploaded
        printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
        window.history.back();
        };
    }
}