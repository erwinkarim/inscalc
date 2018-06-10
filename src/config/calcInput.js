const calcInput = [
  [ // Step One: income card
    {
      name: 'income', min:0, max:2000000, step:1000, label: 'Current income (after taxes):',
      title: 'Annual Income', startAdornment: 'MYR',
      subtext: 'This includes your blah blah'
    },
  ],
  [ // Step One: current expenses card
    {
      name: 'mortage', min:0, max:100000, step: 1000, label: 'Mortage/Rent',
      title: 'Mortage/Rent', startAdornment: 'MYR',
      subtext: 'This is a amount you need day-to-day blah ...'
    },
    {
      name: 'otherExp', min:0, max:100000, step: 1000, label: 'Other Expenses',
      title: 'Loans & Debt', startAdornment: "MYR",
      subtext: 'Amount that you use to service your debts and loans'
    },
    {
      name: 'savings', min:0, max:100000, step: 1000, label: 'Savings',
      title: 'Saving Contributions', startAdornment: "MYR",
      subtext: 'Amount set aside ...'
    },
  ],
  [ // Step One: current insurance coverage card
    {
      name: 'ciInsurance', min:0, max:2500000, step: 1000, label: 'Current Critical Illness Coverage',
      title:'Critical Illness Coverage', startAdornment: "MYR",
      subtext: 'Critical illness insurance coverage'
    },
    {
      name: 'currInsurance', min:0, max:2500000, step: 1000, label: 'Current Insurance',
      title:'Current Insurance', startAdornment: "MYR",
      subtext: 'Medical Coverage'
    },
    {
      name: 'epf', min:0, max:2500000, step: 1000, label: 'EPF Account 2',
      title:'EPF Account II', startAdornment: "MYR",
      subtext: 'Amount of money in EPF Account II'
    },
  ],
  [ // Step 2: required coverage for Hospitalization
    {
      name: 'healthcareExpenses', min:0, max:500000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Healthcare expenses', startAdornment: 'MYR',
      subtext: 'Hospitalization costs',
    },
    {
      name: 'otherExpenses', min:0, max:100000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Other expenses', startAdornment: 'MYR',
      subtext: 'Other expenses while you in the hospital',
    },
  ],
  [ // Step 3: required coverage for recovery
    {
      name: 'recoveryMonthly', min:0, max:10000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Healthcare expenses', startAdornment: 'MYR',
      subtext: 'Required expenses per month'
    },
    {
      name: 'recoveryTime', min:0, max:120, label: 'Recovery time (in months):',
      title: 'Recovery period', endAdornment: 'Months',
      subtext: 'How many months before you will able to work again',
    },
    {
      name: 'desiredIncome', min:0, max:400000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Desired monthly replacement income', startAdornment: 'MYR',
      subtext: 'Amount of times in month for recovery before working full time'
    },
  ]
];

export default calcInput;
