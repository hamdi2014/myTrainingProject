for(let i=0; i<document.getElementById('tblAlarms').rows.length; i++){

    const dtlBtn = document.getElementById(i.toString());
    const row = document.getElementById('tblAlarms').rows[i];
    dtlBtn.onclick = function(){
        // document.getElementById('card').style = 'opacity: 1;';
        // document.getElementById('cardHeader').innerText = row.getElementsByTagName('td')[1].innerText+
        // ' ' + row.getElementsByTagName('td')[4].innerText + ' ' + row.getElementsByTagName('td')[5].innerText;;
        // document.getElementById('cardFooter').innerText = 'Box ' + row.getElementsByTagName('td')[2].innerText +
        //   ' Lamp ' + row.getElementsByTagName('td')[3].innerText;
        document.getElementById('alarmDetailsLabel').innerText = row.getElementsByTagName('td')[0].innerText;
        // SHOW
        const myModal = new bootstrap.Modal(document.getElementById('alarmDetails'));
        myModal.show();
    };
}


{/* <div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div> */}