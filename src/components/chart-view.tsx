import {
  AreaChart,
  Card,
  Flex,
  Icon,
  Text,
  Title,
  Toggle,
  ToggleItem,
} from "@tremor/react";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

const performance = [
  {
    date: "2021-01-01",
    Sales: 900.73,
    Profit: 173,
    Customers: 73,
  },
  {
    date: "2021-01-02",
    Sales: 1000.74,
    Profit: 174.6,
    Customers: 74,
  },
  // ...
  {
    date: "2021-03-13",
    Sales: 882,
    Profit: 682,
    Customers: 682,
  },
];

// Basic formatters for the chart values
const dollarFormatter = (value: number) =>
  `$ ${Intl.NumberFormat("us").format(value).toString()}`;

const numberFormatter = (value: number) =>
  `${Intl.NumberFormat("us").format(value).toString()}`;

export default function ChartView() {
  const [selectedKpi, setSelectedKpi] = useState("Sales");

  // map formatters by selectedKpi
  const formatters: { [key: string]: (value: number) => string } = {
    Sales: dollarFormatter,
    Profit: dollarFormatter,
    Customers: numberFormatter,
  };

  return (
    <Card>
      <div className="justify-between md:flex">
        <div>
          <Flex
            justifyContent="start"
            className="space-x-0.5"
            alignItems="center"
          >
            <Title> Performance History </Title>
            <Icon
              icon={InfoIcon}
              variant="simple"
              tooltip="Shows day-over-day (%) changes of past performance"
            />
          </Flex>
          <Text> Daily increase or decrease per domain </Text>
        </div>
        <div className="mt-6 md:mt-0">
          <Toggle
            color="zinc"
            defaultValue={selectedKpi}
            onValueChange={(value) => setSelectedKpi(value)}
          >
            <ToggleItem value="Sales" text="Sales" />
            <ToggleItem value="Profit" text="Profit" />
            <ToggleItem value="Customers" text="Customers" />
          </Toggle>
        </div>
      </div>
      <AreaChart
        data={performance}
        index="date"
        categories={[selectedKpi]}
        colors={["blue"]}
        showLegend={false}
        valueFormatter={formatters[selectedKpi]}
        yAxisWidth={56}
        className="mt-8 h-96"
      />
    </Card>
  );
}
