```
package server

import (
	"fmt"
)

func main() {
	// variables
	var name string = "colo"

	// infered type
	age := 27

	fmt.Printf("This is my name %s and im %d\n", name, age) // doesnt go to the next line like `PrintLn`

	// declare and assign later
	var city string

	city = "Seatle"

	fmt.Printf("i live in %s", city)

	// Multiple variable declaration and assignment
	var country, continent string = "uganda", "africa"

	fmt.Println("I was born in %s in %s\n", country, continent)

	var (
		isEmployed bool   = true
		salary     int    = 50000
		position   string = "developer"
	)
	fmt.Println("isemplyed:%t , this is my salary: %d an im a %s/n", isEmployed, salary, position)

	// Zero values
	// You can think of these a default values
	var defaultInt int
	var defaultFloat float64
	var defaultString string
	var defaultBool bool

	fmt.Printf("Default values \n int:%d\n float:%f\n string:%s\n bool:%t\n", defaultInt, defaultFloat, defaultString, defaultBool)

	// Constants
	// cant be changed
	// can be declared and not used
	const pi = 3.14
	const (
		mon = 1
		tue = 2
	)

	// this are the same
	const typedAge = 25
	const untypedAge int = 25

	// go doesnt have a native enum type
	// it will stat enumerating from the iota
	const (
		Jan int = iota + 1 // 1
		Feb                //2
		Mar                //3
	)

	result := add(3, 4)

	fmt.Println("adding number", result)

	sum, product := calculateSumAndProduct(4, 5)
	// sum, _ := calculateSumAndProduct(4, 5) - can omit this 
	fmt.Printf("the sum:%d the product is %d", sum, product)
}

// to create a public function (or exportable) i need to capitalize it
func add(a int, b int) int {
	return a + b
}

func calculateSumAndProduct(a, b int) (int, int) {
	return a + b, a * b
}

// a and b are now ints
// func calculateSumAndProduct(a,b int,f float64)(int,int){
// 	return a + b , a*b
// }
```

Conditional statments and flow strutures

```
package server

import (
	"fmt"
)

func main() {
	age := 20

	if age >= 18 {
		fmt.Println("you old asf")
	} else if age >= 13 {
		fmt.Println("you yound asf")

	} else {
		fmt.Println("you cant  read this")

	}

	day := "Tuesday"

	switch day {
	case " Monday":
		fmt.Println("Begging of thw week")
	case "Tuesday", "wednesday", "thurday":
		fmt.Println("Midweek")
	// can be omitted
	default:
		fmt.Println("TGIF")

	}

	// Loops
	for i := 0; i < 5; i++ {
		fmt.Println("This is i", i)
	}

	// while loop
	counter := 0
	for counter < 3 {
		fmt.Println("This is i", counter)
		counter++
	}

	iterations := 3
	for {
		if iterations > 3 {
			// some condion is met
			break

			// they also have the continue key word
		}
		iterations++

	}

	// Arrays and Slices
	// Arrays are not multi type
	// they cant change capacity .. once declared
	numbers := [5]int{10, 20, 30, 40, 50}               // you can have less than 5
	numbers[1] = 60                                     // assign type
	fmt.Printf("this is the array %v\n", numbers)       // out put array
	fmt.Println("this is the array has ", len(numbers)) // length of the array
	nums := [...]int{10, 20, 30, 40, 50}                //Numbers at init
	fmt.Printf("this is the array %v\n", nums)          // out put array

	matrix := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Printf("this is the matric %v\n", matrix) // out put array

	// slice is a dynamic array
	// arrays are more memory efficient
	// it could also be a portion of the array

	allNumbers := numbers[:] //creating a aslice of the array
	firstThree := numbers[0:3]
	// the more you add and stretch it doubles it  .. it creates a new array with double the capacity
	allNumbers = append(allNumbers, 4)
	firstThree[1] = 00
	// declaring a slice
	fruits := []string{"banana"}
	fruits = append(fruits, "strabery")
	fruits = append(fruits, "strabery", "banaba")
	morefruits := []string{"sdsd", "sdsd"}
	fruits = append(fruits, morefruits...)

	// iterate
	for index, value := range numbers {
		fmt.Printf("index = %d and value%d", index, value)
	}

	// Hashmaps , key value pairs
	// [keytype]valueType
	capitalCities := map[string]string{
		"Uganda":  "Kampala",
		"Nairobi": "Kenya",
	}

	fmt.Println(capitalCities["Uganda"])
    
	// check if key exits before accessing it .. if i try to get a key that doesnt exist i get the zero value
	capital , exists := capitalCities["Germany"]
	if exists {
		fmt.Println("This is the capital",capital)
	}else {
		println("doesnt exist")
	}
	delete(capitalCities,"Uganda") // deleting a key from a map
}


```

Structs

```
package server

import "fmt"

// a new type ... we can use this as type
// custom data type
type Person struct {
	Name string
	Age  int
}

func main() {
	// structs stand for structure
	// holds data and use it across your application

	person := Person{Name: "Jonh", Age: 25}
	fmt.Printf("this is a person%v\n", person)
	fmt.Printf("this is a person %+v\n", person) // with details

	// anonymous struct
	employee := struct {
		name string
		id   int
	}{
		name: "alice",
		id:   123,
	}

	modifyPersonName(person)
	modifyPersonNameByRef(&person)

	v:= 20
	ptr := &v
	fmt.Printf("value of x:%d and the adrress%p\n",v,ptr)
	*ptr = 30 // modifying the value of the pointer

	person.modifyPersonAge(56)
}


func modifyPersonName(person Person) {
 person.Name = "Collins"
 fmt.Println("inside scope ... you change the copy that only exists here",person.Name)
}
func modifyPersonNameByRef(person *Person) {
 person.Name = "Collins"
 fmt.Println("Modifies reference person",person.Name)
}

// add this method to the struct 

// bracket receiver 
func (p *Person) modifyPersonAge(age int) {
 p.Age = age
 fmt.Println("inside scope ... you change the copy that only exists here",p.Age)
}

```