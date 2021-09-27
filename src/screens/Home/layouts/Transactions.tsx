import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../../components/Themed';
import {Colors} from '../../../constants';
import BellSvg from '../../../assets/images/bell.svg';
import {scale} from 'react-native-size-matters';
import {color} from 'react-native-reanimated';

export default function Transactions({navigation, data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transaction</Text>
      <View>
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.card}>
                <View style={[styles.row, {flex: 1}]}>
                  <View style={[styles.row, {flex: 1}]}>
                    <View style={{flex: 0}}>
                      <View
                        style={[
                          styles.cardIcon,
                          {
                            backgroundColor:
                              item?.status == 'error'
                                ? Colors.danger
                                : item?.status == 'success'
                                ? Colors.success
                                : item?.status == 'pending'
                                ? Colors.info
                                : Colors.warning,
                          },
                          ,
                        ]}>
                        <BellSvg width={25} height={25} size={25} />
                      </View>
                    </View>
                    <View style={{flex: 1, marginLeft: scale(10)}}>
                      <Text style={styles.cardTitle}>{item?.title}</Text>
                      <Text style={styles.body}>{item?.body}</Text>
                    </View>
                  </View>
                  <View style={{flex: 0}}>
                    <Text
                      style={[
                        styles.amount,
                        {
                          color:
                            item?.status == 'error'
                              ? Colors.danger
                              : item?.status == 'success'
                              ? Colors.success
                              : item?.status == 'pending'
                              ? Colors.info
                              : Colors.warning,
                        },
                      ]}>
                      ${item?.amount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{color: Colors.danger, textAlign: 'center'}}>
            No transaction yet
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    marginBottom: scale(10),
    shadowColor: Colors.hash,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 24,
    minHeight: scale(100),
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    backgroundColor: Colors.white,
    borderColor: Colors.hash,
    borderWidth: 1.1,
  },
  cardIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(10),
  },
  title: {
    fontSize: scale(19),
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: scale(10),
  },
  cardTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  body: {
    fontSize: scale(12),
    fontWeight: '400',
    textTransform: 'capitalize',
    opacity: 0.8,
  },
  amount: {
    fontSize: scale(16),
    fontWeight: '700',
  },
});
