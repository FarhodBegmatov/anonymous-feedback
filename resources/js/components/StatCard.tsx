export default function StatCard({
    icon,
    label,
    value,
    gradient,
}: {
    icon: string;
    label: string;
    value: number | string;
    gradient: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div
                className={`absolute inset-0 bg-gradient-to-r opacity-10 ${gradient}`}
            ></div>
            <div className="relative flex items-center">
                <div
                    className={`rounded-lg bg-gradient-to-r ${gradient} p-3 text-white shadow-md`}
                >
                    <i className={`fas ${icon} text-xl`}></i>
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}
