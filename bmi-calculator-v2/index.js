// FUNCTION - CALCULATE BMI 
function calculateBMI(weight, height) {
    const BMI = weight / (height * height);
    return Math.round(BMI);
}

// FUNCTION - CALCULATE BMR
function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;
    let BMR;
    if (genderOfUser === "m") {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
} else {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
}
return BMR;
}

// FUNCTION - CALCULATE IDEAL WEIGHT
function calculateIdealWeight(height, height) {
    return Math.round(22.5 * height * height);
}

// FUNCTION - CALCULATE DAILY CALORIES
function calculateDailyCalories(BMR, dailyExercise) {
// Conditional statement method
    let dailyCalories;
    if (dailyExercise === "yes") {
        dailyCalories = BMR * 1.6;
    } else {
        dailyCalories = BMR * 1.4;
    }
return dailyCalories;
}

// FUNCTION CALCULATE DIET WEEKS
function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}

// FUNCTION CALCULATE DIET CALORIES
function calculateDietCalories(valueOfdailyCalories, weightToLose) {
    // Ternary expressions method
    return weightToLose > 0 ? valueOfdailyCalories - 500 : valueOfdailyCalories + 500;
}

// //Conditional statements method
// function calculateDietCalories(valueOfdailyCalories, weightToLose) {
//     let dietCalories;

//     if (weightToLose > 0) {
//         dietCalories = valueOfdailyCalories - 500;
//     } else {
//         dietCalories = valueOfdailyCalories + 500;
//     }
//     return dietCalories;
// }



    // Validate number of inputs = 7
function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
        You gave ${argv.length - 2} arguments to the program

        Please provide 5 arguments for
        
        weight (kg), 
        height (m), 
        age (years), 
        wether you exercise daily (yes or no)
        and your gender (m or f)
        
        Example:
    
        $ node index.js 82 1.79 32 yes m
        `);
        process.exit();
    }
}

// Validate Weight, height and age should be numbers
function validateWeightHeightAndAge(weight, height, age, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        console.log(`
        Please make sure weight, height and age are numbers:
    
        weight (kg) example: 82 | your input: ${process.argv[2]}
        height (m) example 1.79 | your input: ${process.argv[3]}
        age (years) example 32  | your input: ${process.argv[4]} 
    
        $ node index.js 82 1.79 32 yes m
        `);
        process.exit();
    }

    // Validate age > 20
    if (age < 20) {
        console.log(`
        Your age is ${process.argv[4]}. This app only works for users over 20');
        `);
        process.exit();
    }

    // Validate WEIGHT from 30 to 300 kg
    if (weight < 30 || weight > 300) {
        console.log(`
        Please provide a number of weight in kilograms between 30 and 300
        You entered - ${process.argv[2]}
        $ node index.js 82 1.79 32 yes m
        `);
        process.exit();
    }
}
// Validate dailyExercises YES or NO)
function validateDailyExercises(doesUserExercise) {
        if (doesUserExercise !== "yes" && doesUserExercise !== "no") {
            console.log(`
            The value for daily exercise should be either "yes" or "no"
            You entered: ${doesUserExercise}
            `);
            process.exit();
    }
}

// Validate Gender should be m OR f
function validateGender(genderOfUser) {
    if (genderOfUser !== "m" && genderOfUser !== "f") {
      console.log(`
        Please specify wether you are a male "m" or female "f"
  
        You entered: ${genderOfUser}
      `);
  
      process.exit();
    }
}

  function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}

    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeightKg} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeightKg} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
}


// HARDCODING DATA
function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercises(dailyExercise);
    validateGender(gender);
    
    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeightKg = calculateIdealWeight(heightInM, heightInM);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLoseKg = weightInKg - idealWeightKg;
    const dietWeeks = calculateDietWeeks(weightToLoseKg);
    const dietCalories = calculateDietCalories(dailyCalories, weightToLoseKg);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeightKg: idealWeightKg,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLoseKg,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories
    };
    
    const output = formatOutput(user);
    console.log(output);
}


//     console.log("WEIGHT: ", weightInKg);
//     console.log("HEIGHT: ", heightInM);
//     console.log("AGE: ", age);
//     console.log("DAILY EXERCISE: ", dailyExercise);
//     console.log("GENDER: ", gender);
//     console.log("BMI:", BMI);
//     console.log("BMR:", BMR);
//     console.log("IDEAL WEIGHT:", idealWeightKg,"kg");
//     console.log("DAILY CALORIES:", dailyCalories);
//     console.log("WEIGHT to LOSE:", weightToLoseKg,"kg");
//     console.log("DIET WEEKS:", dietWeeks,"weeks");
//     console.log("DIET CALORIES:", dietCalories);
// }
    
bmiCalculator();
