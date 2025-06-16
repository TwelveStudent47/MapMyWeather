# MapMyWeather

MapMyWeather is a simple, modern weather web application built with Node.js, Express, EJS, and Bootstrap. It allows users to search for any city and instantly view real-time weather data, including temperature, wind, humidity, UV index, sunrise, and sunset times.

---

## Features

- 🌍 **Search any city** for current weather conditions
- 🌡️ **Displays temperature, feels like, wind, humidity, UV index**
- 🌅 **Shows sunrise and sunset times**
- 📅 **Displays current day and date**
- 🎨 **Responsive, clean UI with Bootstrap and custom CSS**
- ⚡ **Fast and easy to use**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- An [OpenWeather API key](https://openweathermap.org/api)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mapmyweather.git
    cd mapmyweather
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set your OpenWeather API key:**
    - Open `index.js`
    - Replace the value of `yourOpenWeatherApiKey` with your actual API key:
      ```js
      const yourOpenWeatherApiKey = "YOUR_API_KEY_HERE";
      ```

4. **Start the server:**
    ```bash
    node index.js
    ```

5. **Open your browser and visit:**
    ```
    http://localhost:3000
    ```

---

## Project Structure

```
MapMyWeather/
├── public/
│   ├── styles/
│       └── style.css
├── views/
│   └── index.ejs
├── index.js
├── package.json
└── README.md
```

---

## Usage

- On the homepage, you’ll see the weather for the default city (Budapest).
- Use the search form to enter any city name and get its current weather.
- The UI updates with all relevant weather details and icons.

---

## Technologies Used

- **Node.js** & **Express** – Backend server
- **EJS** – Templating engine for dynamic HTML
- **Bootstrap 5** – Responsive design
- **Axios** – HTTP requests to OpenWeather API
- **OpenWeather API** – Weather data provider

---

## Customization

- **Default City:** Change the `defaultCity` variable in `index.js` to set your preferred default location.
- **Styling:** Edit `public/styles/style.css` for custom styles.
- **Icons:** Uses SVG and can be swapped for [Remix Icon](https://remixicon.com/) or other icon sets.

---

## Code Quality

- All code is commented for clarity and maintainability.
- Follows best practices for readability and structure.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [OpenWeather](https://openweathermap.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Remix Icon](https://remixicon.com/) (for icon ideas)

---

## Author

Created by Kevin Laczkó.  
Feel free to fork, contribute, and share!
