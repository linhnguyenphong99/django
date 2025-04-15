const History = ( params: any) => {
  const userHistory = params.userHistory as any[];

  return (
    <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">User History</h2>
        <ul className="space-y-2">
        {userHistory.map((item) => (
            <li key={item.id} className="border-b border-gray-300 pb-2 flex justify-between items-center">
            <span className="text-gray-500 text-sm flex-2">{item.date}</span>
            <span className="text-gray-700 text-left flex-4">{item.action}</span>
            <a href={`/user/history/${item.id}`} className="text-toolify-purple hover:underline flex-2">Details</a>
            </li>
        ))}
        </ul>
    </div>
  );
}

export default History;