// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Courses{
 
 address payable public owner;
 enum State{Purchased,Activated,DeActivated}
 struct Course{
    uint id;
    address owner;
    uint price;
    bytes32 proof;
    State state;
 }
 mapping(bytes32=>Course) public ownedCourses;
 mapping(uint=>bytes32) public ownedCourseHash;


 uint private totalOwnedCourse;
 ///Only owner can access function
 error OnlyOwner();
   /// Course has already a Owner!
  error CourseHasOwner();

 modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
 }
 function purchaseCourse(
    uint courseId,
    bytes32 proof
 ) external payable{
      bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
    if (hasCourseOwnership(courseHash)) {
      revert CourseHasOwner();
    }
    
    uint id = totalOwnedCourse++;
    ownedCourseHash[id]=courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
    


 }
 function getContractOwner()view public returns(address){
    return owner;
 }
function hasCourseOwnership(bytes32 courseHash)
    private
    view
    returns (bool)
{
    return ownedCourses[courseHash].owner == msg.sender;
}

 function getCourseByHash(bytes32 courseHash)
    external
    view
    returns (Course memory)
  {
    return ownedCourses[courseHash];
  }
  function getCourseByIndex(uint index)
    external
    view
    returns (bytes32)
  {
    return ownedCourseHash[index];
  }
function withdrawCourse(bytes32 courseHash,bytes32 proof,uint amount) external payable{

   
 address def;   
 Course memory course =ownedCourses[courseHash];
 course.owner=def;
 course.proof=proof;
 course.state=State.Activated;
 ownedCourses[courseHash]=course;
    
  payable(msg.sender).transfer(amount);

  }
address [] funders;
uint totalFunders;
function addFunds() external payable returns(uint){
  funders.push(msg.sender);
  return ++totalFunders;
  
}
function deactivateCourse(bytes32 courseHash) external payable{

 Course memory course =ownedCourses[courseHash];
 course.state=State.DeActivated;
 ownedCourses[courseHash]=course;
    
 
}
function activateCourse(bytes32 courseHash) external payable{

 Course memory course =ownedCourses[courseHash];
 course.state=State.Purchased;
 ownedCourses[courseHash]=course;
    
                      
}
}

