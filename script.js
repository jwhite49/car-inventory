//base attributes for the cars
class Car {
    constructor(name, model, year, price) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.price = price;
    }
//calculate deprecation price of the car
    calculatePrice() {
        const currentYear = new Date().getFullYear();  //current year
        const age = currentYear - this.year;
        const depreciation = 500 * age;
        return Math.max(this.price - depreciation, 0);  //makes sure price isnt 0
    }
}
//manages all cars added
class CarManager {
    constructor() {
        this.cars = []; //array for all cars
    }

    addCar(name, model, year, price) { //adding car to array
        const car = new Car(name, model, year, price); 
        this.cars.push(car);  //push adds to end of array
    }

    displayCars() { //displaying car on html page
        let listOfCars = document.getElementById('list-of-cars');
        listOfCars.innerHTML = ''; 

        this.cars.forEach((car, index) => {
            let carItem = document.createElement('li');
            carItem.textContent = `${car.name} ${car.model} (${car.year}) - $${car.calculatePrice().toFixed(2)}`;
            listOfCars.appendChild(carItem);
        });
    }
//displays total price of all cars after deprication
    showTotalPrice() {
        let totalPrice = this.cars.reduce((total, car) => total + car.calculatePrice(), 0);
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }
}


const carManager = new CarManager();

//formats information that was submitted
document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault();  

    const name = document.getElementById('Name').value;
    const model = document.getElementById('Model').value;
    const year = parseInt(document.getElementById('Year').value);
    const price = parseFloat(document.getElementById('Price').value);

    carManager.addCar(name, model, year, price);
    carManager.displayCars();  

    document.getElementById('car-form').reset();
});

document.getElementById('calculate-total').addEventListener('click', function() {
    carManager.showTotalPrice();  
});
