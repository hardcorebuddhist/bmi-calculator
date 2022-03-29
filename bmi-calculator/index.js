console.log("What does process.argv contain?", process.argv);

const weightInKg = parseInt(process.argv[2]); // parseInt => parse a whole number
const heightInM = parseFloat(process.argv[3]); // parseFlost => parse a decimal number
const age = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv [6];

process.argv.length // 7

if (process.argv.length !== 7) {
    console.log(`
    You gave ${process.argv.length - 2} arguments(s) to the program

    Please provide 5 arguments for
    
    weight (kg), 
    height (m), 
    age (years), 
    whether you exercise daily (yes or no)
    and your gender (m or f)
    
    Example:

    $ node index.js 82 1.79 32 yes m
  `);
process.exit();
}

// Check if weight OR height OR age is not a number (NaN)
if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
    console.log(`
    Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    $ node index.js 82 1.79 32 yes m
  `);
process.exit();
}

// Check if weight is lower than 30kg OR higher than 300kg
if (weightInKg < 30 || weightInKg > 300) {
console.log(`
Please provide a number of weight in kilograms between 30 and 300
You entered ${weightInKg}
$ node index.js 82 1.79 32 yes m
`);
process.exit();
} 

// Check if user is above 20 years
if (age < 20) {
    console.log('This app only works for users over 20');
    process.exit();
}

// Check if daily exercises were matched as "yes" or "no"
if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
    The value for daily exercise should be either "yes" or "no"
    You entered: ${dailyExercise}
    `);
    process.exit();
}

// The formula for BMI is: weight (kg) / (height (m) x height (m))
const BMI = weightInKg / heightInM * heightInM

// Assumptions ideal BMI is 22.5
// The formula for idealWeight is 22.5 x height (m) x height (m)
const idealWeightKg = 22.5 * heightInM * heightInM;

// The formula for Basal Metabolic Rate (BMR) is: 10 x weight (kg) + 6.25 x height (cm) - 5 x age
const heightInCm = heightInM * 100;

/* Conditional statements
Assumtion: calories for normal lifestyle is BMR * 1.4
If you are a man, we add 50 calories to your BMR
If you are a woman, we can subtract 150 calories from BMR
*/

// let BMR;

// if (gender === "m") {
// // true
// BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50;
// } else {
// // false
// BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;
// }

// // Assumption: calories for a normal lifestyle is BMR * 1.4

// let dailyCalories;

// if (dailyExercise === "yes") {
// // true
// dailyCalories = 1.6 * BMR;
// } else {
// // false
// dailyCalories = 1.4 * BMR;
// }

// Ternary expression

const BMR = gender === "m" ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50 : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;

const dailyCalories = dailyExercise === "yes" ? 1.6 * BMR : 1.4 * BMR;



// let dailyCalories;

// if (gender === "m") {
// // true
// dailyCalories = BMR + 50;
// } else {
// // false
// dailyCalories = BMR - 150;
// }

// Assumption: This app is built for people who weigh too much
// The amount of weight to lose to reach your idealweight is: weight (kg) - ideal weight (kg)
const weightToLoseKg = weightInKg - idealWeightKg;

// Assumption: we can lose 0.5 kg per week
const dietWeeks = Math.abs(weightToLoseKg / 0.5);

// Assumption: to lose 0.5 kg a week we need to cut calorie intake by 500 calories
// To gain 0.5 kg we need to increase our calory intake by 500 calories
let dietCalories;
if (weightToLoseKg > 0) {
dietCalories = dailyCalories - 500;
} else {
dietCalories = dailyCalories + 500;
}



console.log(`
**************
BMI CALCULATOR
**************

age: ${age} years
gender ${gender}
height: ${heightInM} m
weight: ${weightInKg} kg
Do exercise daily? ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${Math.round(BMI)}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${Math.round(idealWeightKg)} kg
With a normal lifestyle you burn ${Math.round(dailyCalories)} calories a day

*********
DIET PLAN
*********

If you want to reach your ideal weight of ${Math.round(idealWeightKg)} kg
Eat ${Math.round(dietCalories)} calories per day
For ${Math.round(dietWeeks)} weeks
`);