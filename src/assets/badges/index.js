import productionSlayer from './production-slayer.png';
import juniorOfTheMonth from './junior-of-the-month.png';
import employeeOfTheYear from './employee-of-the-year.png';
import topPerformer from './top-performer.png';

export {
  productionSlayer,
  juniorOfTheMonth,
  employeeOfTheYear,
  topPerformer
};

export const BADGES = [
  {
    id: 'production-slayer',
    name: 'Production Slayer',
    titleLine1: 'Production',
    titleLine2: 'Slayer',
    icon: productionSlayer,
    description: 'Awarded for exceptional delivery and excellence in production deployment.',
    color: 'emerald',
    glowColor: 'rgba(34, 197, 94, 0.25)',
  },
  {
    id: 'junior-of-the-month',
    name: 'Junior Of The Month',
    titleLine1: 'Junior Of',
    titleLine2: 'The Month',
    icon: juniorOfTheMonth,
    description: 'Recognized as the standout junior contributor of the month.',
    color: 'purple',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 'employee-of-the-year',
    name: 'Employee Of The Year',
    titleLine1: 'Employee Of',
    titleLine2: 'The Year',
    icon: employeeOfTheYear,
    description: 'Highest annual honor for remarkable contribution and leadership.',
    color: 'amber',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  },
  {
    id: 'top-performer',
    name: 'Top Performer',
    titleLine1: 'Top',
    titleLine2: 'Performer',
    icon: topPerformer,
    description: 'Consistently exceeding expectations and achieving peak performance.',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  },
];
