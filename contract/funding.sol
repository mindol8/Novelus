pragma solidity >=0.7.0 <0.8.0;


contract funding {


    uint amount;
    uint total_amount;
    string name;
    string novel;
  
    function setAmount(uint num) public {
        amount = num;
    }
    function setTotalAmount(uint num) public {
        total_amount = num;
    }
    
    function setName(string memory na) public {
        name = na;
    }
    function setNovel(string memory no) public {
        novel = no;
    }
 
    function getdata() public view returns (uint a, uint t, string memory n, string memory o){
        return (amount,total_amount,name,novel);
    }
}