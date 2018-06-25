
export const totalHealthcareExpenses = (props, future = false) => {
  const healthcareExpenses = parseInt(props.healthcareExpenses, 10);
  const otherExpenses = parseInt(props.otherExpenses, 10);
  const medInflation = parseFloat(props.medInflation, 10);

  const currentExpense = healthcareExpenses + otherExpenses;
  return future ? currentExpense * ((1 + medInflation) ** 5) : currentExpense;
};

export const coverage = (props) => {
  const epfCoverage = props.useEpf ? parseInt(props.epf, 10) : 0;
  return parseInt(props.ciInsurance, 10) +
    parseInt(props.currInsurance, 10) +
    epfCoverage;
};

export const surgeryShortfall = (props, future = false) =>
  Math.max(
    0,
    totalHealthcareExpenses(props, future) - coverage(props),
  );

export const recoveryExpenses = (props, future = false) => {
  const recoveryTime = parseInt(props.recoveryTime, 10);
  const recoveryMonthly = parseInt(props.recoveryMonthly, 10);
  const desiredIncome = parseInt(props.desiredIncome, 10);
  const medInflation = future ? parseFloat(props.medInflation, 10) : 0;
  const inflation = future ? parseFloat(props.inflation, 10) : 0;

  return recoveryTime * (
    (recoveryMonthly * ((1 + medInflation) ** 5)) +
    (desiredIncome * ((1 + inflation) ** 5))
  );
};

export const availableCIFundAfterSurgery = (props) => {
  const ciInsurance = parseInt(props.ciInsurance, 10);
  const healthcareExpenses = parseInt(props.healthcareExpenses, 10);
  const otherExpenses = parseInt(props.otherExpenses, 10);
  const currInsurance = parseInt(props.currInsurance, 10);
  const epf = props.useEpf ? parseInt(props.epf, 10) : 0;

  return ciInsurance - (
    Math.min(
      ciInsurance,
      (healthcareExpenses + otherExpenses) - (currInsurance + epf),
    )
  );
};

export const recoveryShortfall = (props, future = false) => Math.max(
  0,
  recoveryExpenses(props, future) - availableCIFundAfterSurgery(props),
);
