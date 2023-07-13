import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryTheme, VictoryPie } from 'victory-native'
import { useAppSelector } from '../../../../redux/store'

const PieChart = () => {
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
      <Text style={styles.text}>{change} 15634</Text>
      <VictoryPie
        padAngle={({ datum }) => datum.y}
        innerRadius={100}
        theme={VictoryTheme.material}
        data={incexp.map(e => {
          if (e.type) {
            return { x: e.type, y: e.amount }
          } else {
            return { x: e.category, y: e.amount }
          }
        })}
      />
    </VictoryChart>
  )
}

export default PieChart

const styles = StyleSheet.create({
  text: {
    top: 230,
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  }
})