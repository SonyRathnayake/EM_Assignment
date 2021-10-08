import { AppImages } from '../../../../res';

export interface Vicinities {
  id: number;
  imagePath: any;
  titleTxt: string;
  subTxt: string;
}

export const SLIIT_LIST: Vicinities[] = [
  // 1st item dummy for 'stickyHeaderIndices'
  {
    id: 0,
    imagePath: '',
    titleTxt: '',
    subTxt: '',
  },
  {
    id: 1,
    imagePath: AppImages.auditorium,
    titleTxt: 'SLIIT Auditorium',
    subTxt: 'Students meet here for large gatherings',
  },
  {
    id: 2,
    imagePath: AppImages.lab,
    titleTxt: 'Engineering Research Labs',
    subTxt: 'Students meet here Engineering work',
  },
  {
    id: 3,
    imagePath: AppImages.parking,
    titleTxt: 'Parking Spaces',
    subTxt: 'Vehicle parking spaces for Students',
  },
  {
    id: 4,
    imagePath: AppImages.business,
    titleTxt: 'Business Faculty',
    subTxt: 'Business Faculty Vicinity',
  },
  {
    id: 5,
    imagePath: AppImages.hotel_5,
    titleTxt: 'Computer Labs',
    subTxt: 'Computer Labs Vicinity',
  },
];
