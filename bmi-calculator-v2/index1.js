function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ... m
    weight: ... kg
    do you exercise daily? ...

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ...

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ... kg
    With a normal lifestyle you burn ... calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ... kg:

    Eat ... calories a day
    For ... weeks
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
      dietCalories: dietCalories,
    };
  
    // We call formatOutput and pass in all the data using an object
    const output = formatOutput(user);
    // Now that we have all our data grouped in this user object
    // It would be really easy to call another function, for example:
  
    // (note: these functions don't exist, they are just an example)
    // sendEmailWithResults(user)
    // saveToDataBase(user)
    console.log(output);
  }
  
  bmiCalculator();