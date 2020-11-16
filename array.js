const Memory = require('./memory')

const memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        // if the length is larger than the capacity,
        if (this.length >= this._capacity) {
            // resize the array.
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        // set the value of the pointer
        //        (---------ptr---------),(value)
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        // create a space for the old pointer value
        const oldPtr = this.ptr;
        // allocate a new chunk of memory and set it to the pointer
        this.ptr = memory.allocate(size);

        // check the pointer. if null, there is not enough memory to be allocated
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }

        //copy the existing values from the old array into the new
        memory.copy(this.ptr, oldPtr, this.length);

        //free up the previously allocated memory block
        memory.free(oldPtr);

        this._capacity = size;
    }

    get(index) {
        // if supplied index is invalid, or is outside the scope throw an error
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // what does line below mean ????
        return memory.get(this.ptr + index);
    }

    pop() {
        // if there is no index, throw an error.
        if (this.length == 0) {
            throw new Error('Index error');
        }

        // what do lines 57 - 59 mean ????
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        // if the supplied index is outside the scope of the array, throw an error
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // if the length of the array is greater than the capacity, resize the array
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        // copy the item from its current index into the next index in the array,
        //            toIdx                     frmIdx              size
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);

        // then set the selected index with the value being inserted
        memory.set(this.ptr + index, value);

        // increment the length of the array
        this.length++;
    }

    remove(index) {
        // if the supplied index is outside the scope of the array, throw an error.
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        // copy the array, removing the contents of that index,
        //              toIdx               frmIdx                  size
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);

        // decrement the length of the array
        this.length--;
    }

}
// size multiplier
Array.SIZE_RATIO = 3;

// function main() {

//     Array.SIZE_RATIO = 3;

//     // Create an instance of the Array class
//     let arr = new Array();

//     // Add an item to the array
//     // arr.push(3);
//     // arr.push(5);
//     // arr.push(15);
//     // arr.push(19);
//     // arr.push(45);
//     // arr.push(10);

//     // arr.pop();
//     // arr.pop();
//     // arr.pop();
//     // arr.pop();
//     // arr.pop();
//     // arr.pop();

//     // console.log(arr.get(0));

//     arr.push('tauhida');
//     console.log(arr.get(0));

//     console.log(arr);
// }

// main();

//////////////////////////////////////////////////////////////////////
//////////////////////////SECTION QUESTIONS///////////////////////////
//////////////////////////////////////////////////////////////////////

// 2a.) What is the length, capacity and memory address of your array?
// Array { length: 1, _capacity: 3, ptr: 0 }

// 2b.) Add the following in the main function and then print the array:
// arr.push(5);
// arr.push(15);
// arr.push(19);
// arr.push(45);
// arr.push(10);
// Array { length: 6, _capacity: 12, ptr: 3 }

// the length is 6 due to the number of items inserted, the capacity is 12,
// because it resized once from the initial of 3, and the pointer is 3 because
// it starts at the end of the initial size of the array.\

// 3a.) Add the following in the main function and then print the array:
// arr.pop();
// arr.pop();
// arr.pop();
//
// What is the length, capacity, and address of your array? 
// Explain the result of your program after adding the new lines of code.

// the length is the only member to change because there is no need for
// the array to resize as the capacity still has not been reached.

// 4a.) Print the 1st item in the array arr.
// 3

// 4b.) Empty the array and add just 1 item: arr.push("tauhida")
// 4c.) Print this 1 item that you just added. What is the result? Can you explain your result?
// NaN(Not a Number) is the result. why?

// 4d.) What is the purpose of the _resize() function in your Array class?
// The purpose of the resize method is to check if the array is at capacity,
// and then if that is true, creating a new memory block of a larger size to
// meet that capacity need.

// 5.)(URLify a string)

// function urlify(string) {
//     const newString = string.split(' ').join('%20')
//     return newString

// }

// console.log(urlify('www.thinkful.com/tauh ida parv een'));

// 6.)(Filtering an array)

// function filter(array) {
//     let newArray = [];

//     for(let i = 0; i < array.length; i++) {
//         if(array[i] < 5) {
//             array.slice(i)
//         } else {
//             newArray.push(array[i])
//         }
//     }

//     return newArray;

// }

// console.log(filter([1, 3, 2, 5, 4, 6, 8, 20, 23]));

// 7.)(Max sum in the array)

// function maxSum(array) {
//     let sum = 0;
//     let maxSum = 0;

//     for(let i = 0; i < array.length; i++) {
//         sum = 0;
//         sum = array[i];

//         for(let j = i + 1; j < array.length; j++) {
//             sum += array[j]

//             if(sum > maxSum) {
//                 maxSum = sum;
//             }
//         }
//     }
//     return maxSum;
// }

// console.log(maxSum([4, 6, -3, 5, -2, 1]));

// console.log(maxSum([4, 6, -3, 5, -2, 1]));


// 8.)(Merge Arrays)

// function merge(array1, array2) {
//     const sortedArray = [];

//     let index1 = 0;
//     let index2 = 0;
//     for(let i = 0; i < array1.length + array2.length; i++) {
//         // //if array1 has elements, and element in array1 < array2, take from array1.
//         // if(array1.length > index1 && (
//         //     array1[index1] < array2[index2]) || array2.length <= index2 // or if there is no elements in array2
//         // ) {
//         //     sortedArray.push(array1[index1])
//         //     index1++
//         // } else {
//         //     sortedArray.push(array2[index2])
//         //     index2++
//         // }
//         if(array1.length <= index1) {
//             sortedArray.push(array2[index2++])
//         } else if(array2.length <= index2) {
//             sortedArray.push(array1[index1++])
//         } else if(array2[index2] > array1[index1]) {
//             sortedArray.push(array1[index1++])
//         } else {
//             sortedArray.push(array2[index2++])
//         }
//     }

//     return sortedArray;


// }

// console.log(merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))

// 9.)(Remove Characters)

// function removeCharacters(string, letters) {
//     let newString = '';
//     let filter = [];
  
//     for (let i = 0; i < letters.length; i++) {
//         filter.push(letters[i]);
//     }
 
//     for (let j = 0; j < string.length; j++) {
//         if (!filter.includes(string[j].toLowerCase())) {
//             newString += string[j];
//         }
//     }
//     return newString;
//  }
 
//  console.log(removeCharacters('Battle of the Vowels: Hawaii vs. Gronzy', 'aeiou'));