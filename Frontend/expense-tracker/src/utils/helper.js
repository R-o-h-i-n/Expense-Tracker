import moment from "moment";

export const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return regex.test(email);
};


export const getInitials = (name) => {
      if (!name) return "";

      const words = name.trim().split(" ");
      let initials = "";

      if (words.length === 1) {
            initials = words[0].substring(0, 2);
      } else {
            for (let i = 0; i < Math.min(words.length, 2); i++) {
                  initials += words[i][0];
            }
      }
      return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
      if (num == null || isNaN(num)) return "";

      const [integerPart, fractionPart] = num.toString().split(".");
      let formattedInteger = integerPart;

      if (integerPart.length > 3) {
            // Indian numbering system: 1,23,456
            formattedInteger = integerPart.replace(
                  /(\d+)(\d{3})$/,
                  (match, p1, p2) => p1.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + p2
            );
      }
      const result = fractionPart ? `${formattedInteger}.${fractionPart}` : formattedInteger;

      return `₹${result}`;
};


export const prepareExpenseBarChartData = (data = []) => {
      const chartData = data.map((item) => ({
            category: item?.category,
            amount: item?.amount,
      }));
      
      return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

      const chartData = sortedData.map((item) => ({
            month: moment(item?.date).format('Do MMM'),
            amount: item?.amount,
            source: item?.source,
      }));

      return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

      const chartData = sortedData.map((item) => ({
            month: moment(item?.date).format('Do MMM'),
            amount: item?.amount,
            source: item?.category,
      }));

      return chartData;
};