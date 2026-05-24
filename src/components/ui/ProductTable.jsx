export default function ProductTable({ data, onEdit, onDelete }) {
    if (data.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                No products found.
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item) => (
                        <tr
                            key={item._id}
                            className="hover:bg-slate-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-slate-800">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-xs border border-slate-200">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                ฿{item.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                {item.inStock ? (
                                    <span className="text-slate-600 bg-slate-50 px-2 py-1 rounded-sm text-xs font-medium">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-slate-300 bg-slate-50 px-2 py-1 rounded-sm text-xs font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-center space-x-3">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="text-slate-600 hover:text-slate-800 font-medium transition-colors text-xs"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="text-red-500 hover:text-red-700 font-medium px-2 py-1 transition-colors text-xs"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
