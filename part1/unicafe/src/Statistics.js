

export function StatisticsLine({text, value}) {

    if(isNaN(value)){
            value = 0
    }

    return (
                <tbody>
                    <tr>
                        <th scope="row" className="text-start">{text}</th>
                        <td>{value}</td>
                    </tr>
                </tbody>
    )
}