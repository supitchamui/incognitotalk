// describe('create username', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });

// // TC1: สามารถตั้ง username เป็นภาษาอังกฤษเท่านั้น(passed)
//   it('ตั้ง username เป็นภาษาอังกฤษเท่านั้น', () => {
//     // Enter a valid English username
//     const validUsername = 'aom';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })

// // TC2: สามารถตั้ง username เป็นตัวเลขเท่านั้น(passed)
//   it('ตั้ง username เป็นตัวเลขเท่านั้น', () => {
//     const validUsername = '123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })

// // TC5: สามารถตั้ง username เป็นภาษาอังกฤษและตัวเลขได้(passed)
//   it('ตั้ง username เป็นภาษาไทยและตัวเลขได้', () => {
//     const validUsername = 'aom123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })

// // TC6: หาก username มีช่องว่างและอักขระพิเศษ จะไม่สามารถกดเข้าสู่หน้าต่อไป(passed)
//   it('username มีช่องว่างและอักขระพิเศษ จะไม่สามารถกดเข้าสู่หน้าต่อไป', () => {
//     const validUsername = 'aom   123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('not.include', '/home');
//     cy.url().should('not.include', `username=${validUsername}`);
//   })

// // TC8: หากเมื่อ user ไม่สามารถเข้าสู่หน้าต่อไปได้ จะแจ้งเตือน(passed)
//   it('user ไม่สามารถเข้าสู่หน้าต่อไปได้ จะแจ้งเตือน', () => {
//     const validUsername = '1234567890123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();
//     cy.get('.text-red-500').should('be.visible');
//   })

// // TC3: สามารถตั้ง username เป็นภาษาไทยเท่านั้น(Fail)
//   it('ตั้ง username เป็นภาษาไทยเท่านั้น', () => {
//     const validUsername = 'ออม';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })
  
// // TC4: สามารถตั้ง username เป็นภาษาไทยและตัวเลขได้(Fail)
//   it('ตั้ง username เป็นภาษาไทยและตัวเลขได้', () => {
//     const validUsername = 'ออม123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })

// // TC7: หาก username ไม่เกิน 13 ตัวอักษร จะสามารถเข้าสู่หน้าต่อไป(Fail)
//   it('username ไม่เกิน 13 ตัวอักษร จะสามารถเข้าสู่หน้าต่อไป', () => {
//     const validUsername = '1234567890123';
//     cy.get('input[name="username"]').type(validUsername);
//     cy.get('button[name="Go"]').click();

//     cy.url().should('include', '/home');
//     cy.url().should('include', `username=${validUsername}`);
//   })

// })



describe('Logout Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/home?username=aom');
  });

  it('ใใใ', () => {
    cy.get('button[name="account"]').click();
    //cy.get('.text-sm').click({ multiple: true });
    cy.get('.bg-borderColor').should('be.visible');

    // คลิกที่ปุ่ม Logout
    cy.contains('button', 'Logout').click();

    cy.window().then((win) => {
      const users = win.users; 
  
    });
  });
});
