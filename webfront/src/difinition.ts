const setYears = () => {
    const dataYears = [];

    for (let i = 2000; i <= new Date().getFullYear(); i++) {
        dataYears.push(i);
    }
    return dataYears;
}

export const years = setYears();

const setMonths = () => {
    const dataMonths = [];
    for (let i = 1; i <= 12; i++) {
        dataMonths.push(i);
    }
    return dataMonths;
}

export const months = setMonths();

const setDays = () => {
    const dataDays = [];
    for (let i = 1; i <= 31; i++) {
        dataDays.push(i);
    }
    return dataDays;
}

export const days = setDays();

const setAttribute = () => {
    const dataAttributes = ["-- set your attribute --", "license"];

    return dataAttributes;
}

export const attributes = setAttribute();