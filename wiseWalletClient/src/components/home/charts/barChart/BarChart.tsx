import React from 'react'
import { VictoryChart, VictoryTheme, VictoryBar } from 'victory-native'
import { useAppSelector } from '../../../../redux/store'

const BarChart = () => {
  const charGraficos = useAppSelector(state => state.onBoarding.Onboarding)
  const incomes = useAppSelector(state => state.allMovements.incomes)
  const expenses = useAppSelector(state => state.allMovements.expenses)

  const incexp: any[] = [...incomes, ...expenses]

  const change = charGraficos.change.map(item => item.name)

  const chart = charGraficos.grafico.map(item => item.name)

  console.log('====================================')
  console.log(chart[0], 'chart')
  console.log('====================================')

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryBar
        data={incexp.map(e => {
          if (e.type) {
            return { x: e.type, y: e.amount }
          } else {
            return { x: e.category, y: e.amount }
          }
        })}
        labels={({ datum }) => datum.y}
        style={{
          data: { fill: "blue" },
          labels: { fontSize: 12, fill: "black" },
        }}
      />
    </VictoryChart>
  )
}

export default BarChart