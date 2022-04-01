process.exit();
}
}

function validateDailyExercise(doesUserExercise) {
if (doesUserExercise !== "yes" && doesUserExercise !== "no") {
  console.log(`
    Please specify wether you exercise daily with yes or no

    You entered: ${doesUserExercise}

    (Don't worry, we won't judge you if you enter no)
`);

  process.exit();
}
}

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

    Your ideal weight is ${userObject.weightInKg} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeightKg} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
}

function bmiCalculator() {
validateNumberOfInputs(process.argv);

const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];

validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
validateDailyExercise(dailyExercise);
validateGender(gender);

const BMI = calculateBMI(weightInKg, heightInM);
const idealWeightKg = calculateIdealWeight(heightInM);
const BMR = calculateBMR(weightInKg, heightInM, age, gender);
const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
const weightToLoseKg = weightInKg - idealWeightKg;
const dietWeeks = calculateDietWeeks(weightToLoseKg);
const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories);

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

bmiCalculator();