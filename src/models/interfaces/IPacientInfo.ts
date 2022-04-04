import { Types } from 'mongoose';

export interface IPacientInfo {
  userId: Types.ObjectId;
  heartDisease: boolean; //заболевания сердца
  bloodDisease: boolean; //заболевания крови
  liverDisease: boolean; //заболевания печени
  kidneyDisease: boolean; //заболевания почек
  lungDisease: boolean; //заболевания легких
  skinDisease: boolean; //заболевания кожи
  infectiousDisease: boolean; //инфекционные заболевания
  bowelDisease: boolean; // заболевания кишечника
  eyeDisease: boolean; // заболевания глаз
  entDisease: boolean; // заболевания лор органов
  pacemakerPresence: boolean; //наличие кардиостимулятора
  epilepsy: boolean; //наличие эпилепсии
  //
  injury: boolean; //травмы
  operations: boolean; // операции
  bloodTransfusion: boolean; // переливания крови
  concussion: boolean; //сотрясения мозга
  radiationChemoTherapy: boolean; // химио-лучевая терапия
  //
  allergy: {
    antibiotics: boolean; // антибиотики
    iodinePreparations: boolean; // йод
    hormonalPreparations: boolean; // гормональные препараты
    pollen: boolean; // пыльца
    foodProducts: boolean; // пищевые продукты
    animal: boolean; // животные
  };
  smoking: boolean; // курение
  pregnancy: boolean; //беременность
  lactation: boolean; // грудное вскармливание
  contraceptives: boolean; // противозачаточные препараты
}
