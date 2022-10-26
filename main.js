const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//save film and price//
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update and count selected seats//
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //get the index number of the seats//
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  //store the data in the local storage//

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//get datastorage and populate the ui//
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  //store the film data//

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//select the film//
movieSelect.addEventListener('change', (e) => {
  //get the price of the ticket//
  ticketPrice = +e.target.value;
  setMovieData = (e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
//select the class name of 'seats' not the class name of 'occupied'//
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    //select and unselect the 'seat' class
    e.target.classList.toggle('selected');
  }
  updateSelectedCount();
});

// function to update data and store to the local storage.//
updateSelectedCount();
