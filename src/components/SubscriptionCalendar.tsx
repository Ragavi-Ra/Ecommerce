import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SubscriptionType } from '../store/CartContext';

type Props = {
  subscriptionType: SubscriptionType;
  selectedDates: string[];
  onChange: (dates: string[]) => void;
};

type DateObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const weekdayIndex = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDay();
};

const isAllowedByType = (type: SubscriptionType, dateStr: string) => {
  if (!type) return true;
  const dow = weekdayIndex(dateStr);
  if (type === 'weekend') return dow === 0 || dow === 6;
  if (type === 'weekday') return dow >= 1 && dow <= 5;
  return true;
};

export default function SubscriptionCalendar({ subscriptionType, selectedDates, onChange }: Props) {
  const [marks, setMarks] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const m: { [key: string]: any } = {};
    selectedDates.forEach((d) => {
      m[d] = { selected: true, selectedColor: '#3b82f6' };
    });
    setMarks(m);
  }, [selectedDates]);

  const onDayPress = (day: DateObject) => {
    const dateStr = day.dateString;
    if (!isAllowedByType(subscriptionType, dateStr)) {
      Alert.alert('Not allowed', `This day is not selectable for the chosen subscription type.`);
      return;
    }

    let next = [...selectedDates];
    const idx = next.indexOf(dateStr);
    if (idx >= 0) {
      next.splice(idx, 1);
    } else {
      if (next.length >= 10) {
        Alert.alert('Limit reached', 'You can select up to 10 days.');
        return;
      }
      next.push(dateStr);
    }

    onChange(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.note}>
        Note: Only 5 days (10% discount) or 10 days (15% discount) will apply subscription discount.
        {subscriptionType ? '' : '\nSelect a subscription type first.'}
      </Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={marks}
        enableSwipeMonths={true}
      />

      <Text style={styles.selectedCount}>Selected days: {selectedDates.length} (pick exactly 5 or 10 for discounts)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  note: { marginBottom: 8, color: '#374151' },
  selectedCount: { marginTop: 8, fontWeight: '600' },
});
