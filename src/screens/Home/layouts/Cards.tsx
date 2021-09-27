import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../../components/Themed';
import {Colors, Styles} from '../../../constants';
import CardSvg from '../../../assets/images/mastercard.svg';
import {scale} from 'react-native-size-matters';

export default function Cards({cards}) {
  return (
    <View style={[styles.container]}>
      <FlatList
        horizontal={true}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards || []}
        renderItem={({item, index}) => {
          return <Card key={index} item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function Card({item}) {
  const formatNumber = number => {
    const e = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];

    number = parseFloat(number);

    const pieces = number.toFixed(0).replace('.', '.').split('');

    let ii = pieces.length - (0 ? 0 + 1 : 0);

    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ',');
    }

    return pieces.join('');
  };

  return (
    <View
      style={[styles.card, {backgroundColor: item?.priColor || Colors.grey}]}>
      <View style={[styles.row, {flex: 0}]}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
        <View style={{flex: 0}}>
          <CardSvg width={40} height={40} fill={Colors.primary} size={40} />
        </View>
      </View>

      <View style={[styles.row, {flex: 1}]}>
        <View style={{flex: 1}}>
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            <View style={{flex: 0}}>
              <View
                style={[
                  styles.currency,
                  {backgroundColor: item?.secColor || Colors.lightgrey},
                ]}>
                <Text style={styles.currencyText}>{item?.currency}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.balance}>
                {formatNumber(Number(item?.balance || 0))}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.number]}>
            {item?.number
              ? item?.number.match(/.{1,4}/g).map((num, index) => {
                  if (index < 3) {
                    return (
                      <View>
                        <Text style={styles.numberText}>****</Text>
                      </View>
                    );
                  }
                  return (
                    <View>
                      <Text style={styles.numberText}>{num}</Text>
                    </View>
                  );
                })
              : ''}
          </View>
        </View>
      </View>

      <View style={[styles.row, {flex: 0}]}>
        <View style={{flex: 1}}>
          <Text style={styles.holder}>{item?.holder}</Text>
        </View>
        <View style={{flex: 0}}>
          <View>
            <Text style={styles.dateTitle}>Exp. Date</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.date}>{item?.month}</Text>
            <Text style={[styles.date, {marginHorizontal: 2}]}>/</Text>
            <Text style={styles.date}>{item?.year}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(20),
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    width: Dimensions.get('window').width - Styles.body.paddingHorizontal * 2,
    height: scale(200),
    borderRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    marginRight: scale(10),
  },
  title: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  currency: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
  },
  currencyText: {
    fontSize: scale(16),
    textTransform: 'uppercase',
    color: Colors.white,
    fontWeight: '500',
  },
  balance: {
    fontSize: scale(25),
    textTransform: 'uppercase',
    color: Colors.white,
    fontWeight: '500',
    marginLeft: scale(5),
  },
  number: {
    marginVertical: scale(10),
    justifyContent: 'flex-start',
  },
  numberText: {
    fontSize: scale(23),
    textTransform: 'uppercase',
    color: Colors.white,
    fontWeight: '400',
    marginLeft: scale(5),
  },
  holder: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  dateTitle: {
    color: Colors.white,
    fontSize: scale(10),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  date: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
