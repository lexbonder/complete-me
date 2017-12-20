export default class Node {
  constructor(value) {
    this.value = value;
    this.fullWord = false;
    this.favored = 0;
    this.children = {};
  }
}


//         ___________Root_______________
//        /             |                \
//   {value,          value,            value}
//    /   \             |                /  \
//{child, child}     {child}        {child, child}