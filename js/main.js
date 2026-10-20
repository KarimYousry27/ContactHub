var fullNameInput = document.getElementById("fullName");
var phoneNumberInput = document.getElementById("phoneNumber");
var emailAddressInput = document.getElementById("emailAddress");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var isFavoriteInput = document.getElementById("isFavorite")
var isEmergencyInput = document.getElementById("isEmergency");
var rowData = document.getElementById("rowData")
var totalContacts = document.getElementById("totalContacts");
var favoritesCount = document.getElementById("favoritesCount");
var emergencyCount = document.getElementById("emergencyCount");
var favoritesList = document.getElementById("favoritesList");
var emergencyList = document.getElementById("emergencyList");
var saveContactBtn = document.getElementById("saveContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");
var searchInput = document.getElementById("searchInput");



var contacts;

if (localStorage.getItem('contactList') == null) {
    contacts = []
}
else {
    contacts = JSON.parse(localStorage.getItem('contactList'))
    displayContacts(contacts)
}

function addContact() {
    var newContact = {
        fullName: fullNameInput.value,
        phoneNumber: phoneNumberInput.value,
        emailAddress: emailAddressInput.value,
        address: addressInput.value,
        group: groupInput.value,
        notes: notesInput.value,
        isFavourite: isFavoriteInput.checked,
        isEmergency: isEmergencyInput.checked
    }
    if(validateInput(fullNameInput.id,fullNameInput.value)&&validateInput(phoneNumberInput.id,phoneNumberInput.value)){
          console.log(newContact)
    contacts.push(newContact)
    console.log(contacts)
    Swal.fire({
        title: "Good job!",
        text: "Your Contact Added Successfully",
        icon: "success"
    });
    clearInputs();
    displayContacts(contacts)

    localStorage.setItem('contactList', JSON.stringify(contacts))
    var addContactModal = document.getElementById('addContactModal');
    var modal = bootstrap.Modal.getInstance(addContactModal);
    modal.hide();

    }
    else{
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "please enter valid name and valid phone number!",
  
});
    }
  

}

function clearInputs() {
    fullNameInput.value = "";
    phoneNumberInput.value = "";
    emailAddressInput.value = "";
    addressInput.value = "";
    groupInput.value = "";
    notesInput.value = "";
    isFavoriteInput.checked = false;
    isEmergencyInput.checked = false;
}

displayContacts(contacts)

function getInitals(name) {
    name = name.trim();
    if (name.length == 0) return;
    var firstChar = name.charAt(0).toUpperCase();
    var spaceIndex = name.indexOf(" ") //name name
    if (spaceIndex !== -1 && spaceIndex + 1 < name.length) {
        var secondChar = name.charAt(spaceIndex + 1).toUpperCase();
        return firstChar + secondChar
    }
    return firstChar;

}

function displayContacts(array) {
    var favCount = 0;
    var emCount = 0;

    if (array.length == 0) {
        rowData.innerHTML = `
        <div class="col-12 text-center py-5">
    <div class="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-3 bg-light"
       >
        <i class="fa-solid fa-address-book text-secondary" style="font-size:32px;"></i>
    </div>

    <p class="text-secondary fw-medium mb-1">No contacts found</p>
    <p class="text-muted small">Click "Add Contact" to get started</p>
</div>
  
`
        totalContacts.innerHTML = 0;
        document.getElementById('contactsCount').innerHTML = 0;
        favoritesCount.innerHTML = 0;
        emergencyCount.innerHTML = 0;
        favoritesList.innerHTML = 'no favourites';
        emergencyList.innerHTML = 'no emergencies';
        return;

    }
    var cartoona = ``;
    var favContainer = ``;
    var emContainer = ``;
    for (var i = 0; i < array.length; i++) {
        if (array[i].isFavourite == true) {
            favCount++;
            favContainer += `<div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                       ${getInitals(array[i].fullName)}
                    
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>${array[i].fullName}</h5>
                    <p>${array[i].phoneNumber}</p>
                  </div>
                  <button class="sidebar-call-btn favorites-call">
                    <i class="fas fa-phone"></i>
                  </button>
                </div>`

        }
        if (array[i].isEmergency == true) {
            emCount++;
            emContainer += `
           <div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                       ${getInitals(array[i].fullName)}
                    
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>${array[i].fullName}</h5>
                    <p>${array[i].phoneNumber}</p>
                  </div>
                  <button class="sidebar-call-btn favorites-call">
                    <i class="fas fa-phone"></i>
                  </button>
                </div>
            `
        }
        cartoona += `
        <div class="col-lg-6">

              <div class="contact-card">
                <div class="contact-header">
                  <div
                    class="contact-avatar bg-primary ${array[i].isFavourite == true ? 'favorite' : ''} ${array[i].isEmergency == true ? 'emergency' : ''}"
                   
                  >
                   ${getInitals(array[i].fullName)}
                    

                  </div>
                  <div class="contact-info">
                    <h4>${array[i].fullName}</h4>
                  </div>
                </div>
                <div class="contact-details">
                  <div class="contact-detail phone">
                    <i class="fas fa-phone"></i>
                    <span>${array[i].phoneNumber}</span>
                  </div>
                 ${array[i].emailAddress?` <div class="contact-detail email">
                    <i class="fas fa-envelope"></i>
                    <span>${array[i].emailAddress}</span>
                  </div>`:''}
                 ${array[i].address?` <div class="contact-detail address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${array[i].address}</span>
                  </div>`:''}
                </div>
                <div class="contact-tags">
                  <span class="tag ${array[i].group}">${array[i].group}</span>
                  ${array[i].isEmergency ? `<span class="tag emergency">
                    <i class="fas fa-heartbeat"></i> Emergency
                  </span>`: ''}
                </div>
                <div class="contact-actions">
                  <button class="contact-action call" title="Call">
                    <i class="fas fa-phone"></i>
                  </button>
                  <button class="contact-action email" title="Email">
                    <i class="fas fa-envelope"></i>
                  </button>
                  <button onclick="toggleFavourite(${i})"
                    class="contact-action favorite ${array[i].isFavourite == true ? 'active' : ''}"
                    title="Favorite"
                  >
                    <i class="fas fa-star"></i>
                  </button>
                  <button  onclick="toggleEmergency(${i})"
                    class="contact-action emergency ${array[i].isEmergency == true ? 'active' : ''}"
                    title="Emergency"
                  >
                    <i class="fa-solid fa-heart-pulse"></i>
                  </button>
                  <button   data-bs-toggle="modal"
            data-bs-target="#addContactModal" onclick="preUpdate(${i})" class="contact-action" title="Edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick='deleteContact(${i})' class="contact-action delete" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

                  </div> 
       `
    }
    rowData.innerHTML = cartoona;
    totalContacts.innerHTML = contacts.length;
    document.getElementById('contactsCount').innerHTML = contacts.length;
    favoritesCount.innerHTML = favCount;
    emergencyCount.innerHTML = emCount;
    favoritesList.innerHTML = favContainer;
    emergencyList.innerHTML = emContainer;



}

function deleteContact(index) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            contacts.splice(index, 1);
            displayContacts(contacts);
            localStorage.setItem('contactList', JSON.stringify(contacts))
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });


}
var editIndex;
function preUpdate(index) {
    //  var addContactModal = document.getElementById('addContactModal');
    //     var modal = bootstrap.Modal.getOrCreateInstance(addContactModal);
    //     modal.show();

    console.log(index)
    fullNameInput.value = contacts[index].fullName;
    phoneNumberInput.value = contacts[index].phoneNumber;
    emailAddressInput.value = contacts[index].emailAddress;
    addressInput.value = contacts[index].address;
    notesInput.value = contacts[index].notes;
    groupInput.value = contacts[index].group;
    isFavoriteInput.checked = contacts[index].isFavourite;
    isEmergencyInput.checked = contacts[index].isEmergency;
    updateContactBtn.classList.remove('d-none');
    saveContactBtn.classList.add('d-none');
    editIndex = index;


}

function updateContact() {
    var newContact = {
        fullName: fullNameInput.value,
        phoneNumber: phoneNumberInput.value,
        emailAddress: emailAddressInput.value,
        address: addressInput.value,
        group: groupInput.value,
        notes: notesInput.value,
        isFavourite: isFavoriteInput.checked,
        isEmergency: isEmergencyInput.checked

    }
    contacts.splice(editIndex, 1, newContact);
    displayContacts(contacts)
    var addContactModal = document.getElementById('addContactModal');
    var modal = bootstrap.Modal.getInstance(addContactModal);
    modal.hide();
    localStorage.setItem('contactList', JSON.stringify(contacts))
    clearInputs()
    updateContactBtn.classList.add('d-none');
    saveContactBtn.classList.remove('d-none');



}

function toggleFavourite(index){
console.log(index)
contacts[index].isFavourite = !contacts[index].isFavourite
displayContacts(contacts)
  localStorage.setItem('contactList', JSON.stringify(contacts))
}
function toggleEmergency(index){
contacts[index].isEmergency = !contacts[index].isEmergency
displayContacts(contacts)
  localStorage.setItem('contactList', JSON.stringify(contacts))
}

function search(){
    var searchArr=[];
    for(var i=0 ;i<contacts.length;i++){
        if(contacts[i].fullName.toLowerCase().includes(searchInput.value.toLowerCase())||
        contacts[i].phoneNumber.toLowerCase().includes(searchInput.value.toLowerCase())||
        contacts[i].emailAddress.toLowerCase().includes(searchInput.value.toLowerCase())
    ){
            searchArr.push(contacts[i])
        }
    }
    displayContacts(searchArr)
}

var selectedInputs = document.querySelectorAll('.selectedInput')
console.log(selectedInputs)

for (var i=0;i<selectedInputs.length;i++){
    selectedInputs[i].addEventListener('input',function(e){
     console.log(e.target)
     var inputId = e.target.id;
     var inputVal = e.target.value;
     validateInput(inputId,inputVal)
    })
}

function validateInput(id,value){
    var regex ={
        fullName:/^[a-z\s]{3,15}$/,
        phoneNumber:/^01[0125][0-9]{8}$/
    }
    var ele = document.getElementById(id)
    if(regex[id].test(value)==true){ ///^[a-z]{3,15}$/.test(mmm)
       ele.classList.add('is-valid')
       ele.classList.remove('is-invalid')
      ele.nextElementSibling.classList.replace('d-block','d-none')
      return true;

    }
    else{
        ele.classList.add('is-invalid')
         ele.classList.remove('valid')
        ele.nextElementSibling.classList.replace('d-none','d-block')
        return false;
    }
}



