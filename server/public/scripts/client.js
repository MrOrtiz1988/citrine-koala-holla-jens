console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  deleteKoalas();
  updateKoalas();
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas

 $.ajax({
  method: 'POST',
  url: '/koalas',
  data: {
   name: koalaToSend.name,
   age: koalaToSend.age,
   gender: koalaToSend.gender,
   readyForTransfer: koalaToSend.readyForTransfer,
   notes: koalaToSend.notes
 }
  }).then(function(response) {
    saveKoala();
  })
}; 
// end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then(function(koalas) {
    $('#viewKoalas').empty();
    for(let koala of koalas){
      $('#viewKoalas').append( `
      <tr data-id=${koala.id}>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.gender}</td>
    <td>${koala.readyForTransfer}</td>
    <td align="center"><button class="ready-for-transfer-btn">"Ready for Transfer"</button></td>
    <td align="center"><button class="delete-btn">Delete</button></td>
    <td>$ ${koala.notes}</td>
</tr>
      `);
    }
});
}

function deleteKoalas() {
  let idToDelete = $(this).parent().data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then(function(response) {
    saveKoala();
}).catch(function(error) {
    alert('something broke');
  });
}

function updateKoalas() {

let idToUpdate = $(this).parent().data('id');

$.ajax({
  method: 'PUT',
  url: `/koalas/${idToUpdate}`,
  data: {
    // what data are we changing 
  }
}).then(function(response) {
  saveKoala();
}).catch(function(error) {
  console.log('uh oh. updateToDigidog fail:', error);
});
} 
