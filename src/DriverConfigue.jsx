import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DriverConfigue = driver(
    {
        showProgress: true,
        steps: [
            {
                element: ".mic-button", popover: {
                    title: "Mic Button",
                    description: "Allow to use voice input",
                    side: "right",
                    align: 'start'
                }
            }
        ]
    }
);

export default DriverConfigue;