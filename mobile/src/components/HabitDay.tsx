import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

import { generateProgessPercentage } from "../utils/progress-percentage";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const day_size =  (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amauntOfHabits?: number;
  amauntCompleted?: number;
  date: Date;
}

export function HabitDay({ amauntOfHabits = 0, amauntCompleted = 0, date, ...rest }: Props) {
  const amauntAccomplishedPercentage = amauntOfHabits > 0 ? generateProgessPercentage(amauntOfHabits, amauntCompleted) : 0
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity 
      className={clsx(
        "rounded-lg border-2 m-1", {
          ["bg-zinc-900 border-zinc-800"] : amauntAccomplishedPercentage === 0,
          ["bg-violet-900 border-violet-700"] : amauntAccomplishedPercentage > 0 && amauntAccomplishedPercentage < 20,
          ["bg-violet-800 border-violet-600"] : amauntAccomplishedPercentage >= 20 && amauntAccomplishedPercentage < 40,
          ["bg-violet-700 border-violet-500"] : amauntAccomplishedPercentage >= 40 && amauntAccomplishedPercentage < 60,
          ["bg-violet-600 border-violet-500"] : amauntAccomplishedPercentage >= 60 && amauntAccomplishedPercentage < 80,
          ["bg-violet-500 border-violet-400"] : amauntAccomplishedPercentage >= 80,
          ["border-white border-4"] : isCurrentDay,
        } 
      )}
      style={{ width: day_size, height: day_size }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}