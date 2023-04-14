console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  renderKoala();
  // deleteKoalas();
 
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };

    console.log('THIS IS AS IT IS BUILT');
    console.log(koalaToSend)
    // call saveKoala with the new obejct
    newKoala( koalaToSend );
  }); 

  $("#viewKoalas").on('click', '.ready-for-transfer-btn', updateKoalas);
  $("#viewKoalas").on('click', '.delete-btn', deleteKoalas);
}

function newKoala(koalaToSend){
  console.log('THIS IS THE KOALA');
  // ajax call to server to get koalas

 $.ajax({
  method: 'POST',
  url: '/koalas',
  data: koalaToSend
  }).then(function(response) {
    renderKoala();
  })
}; 
// end getKoalas

function renderKoala(){

  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then(function(koalas) {
    console.log(koalas);
    $('#viewKoalas').empty();
    for(let koala of koalas){
      $('#viewKoalas').append( `
      <tr data-id=${koala.id}>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.gender}</td>
    <td>${koala.ready_to_transfer}</td>
    <td>$${koala.notes}</td>
    <td align="center"><button class="ready-for-transfer-btn">"Ready for Transfer"</button></td>
    <td align="center"><button class="delete-btn">Delete</button></td>
</tr>
      `);
    }
});
}

function deleteKoalas() {
  let idToDelete = $(this).parent().parent().data('id');
  console.log(idToDelete)
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then(function(response) {
    renderKoala();
}).catch(function(error) {
    alert('something broke');
  });
}

function updateKoalas() {

let idToUpdate = $(this).parent().parent().data('id');
console.log(idToUpdate);
$.ajax({
  method: 'PUT',
  url: `/koalas/${idToUpdate}`,
  data: {
      readyForTransfer: 'Y'
  }
}).then(function(response) {
  renderKoala();
}).catch(function(error) {
  console.log('uh oh. updateToDigidog fail:', error);
});
} 
