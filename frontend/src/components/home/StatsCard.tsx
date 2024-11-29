type StatsCardProps = {
  title: string;
  network1: string;
  network2: string;
  value1: number;
  value2: number;
  gradient: string; // Gradiente para o fundo
};

const StatsCard = ({
  title,
  network1,
  network2,
  value1,
  value2,
  gradient,
}: StatsCardProps) => {
  const totalValue = value1 + value2;
  const value1Percentage = totalValue > 0 ? (value1 / totalValue) * 100 : 0;

  return (
    <div
      className={`w-full bg-gradient-to-r ${gradient} text-white p-4 rounded-lg shadow-md`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 flex justify-between">
        <p>{network1}</p>
        <p>{network2}</p>
      </div>
      <div className="w-full mt-2">
        <div className="flex items-center mb-2">
          <div className="w-full h-2 bg-white rounded-md">
            <div
              className="h-full bg-cyan-500 rounded-md"
              style={{ width: `${value1Percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
