describe('US3: ผู้ใช้สามารถตั้งชื่อ username เป็นภาษาไทยตามเงื่อนไขที่กำหนดไว้', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('TC1: หาก username มีช่องว่างหรืออักขระพิเศษ จะไม่สามารถกดเข้าสู่หน้าต่อไป', () => {
    const validUsername = 'aom   123';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();

    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);

  })

  it('TC2: สามารถตั้ง username เป็นภาษาไทย', () => {
    const validUsername = 'ออม';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();  
  })
  
  it('TC3: สามารถตั้ง username เป็นภาษาไทยและตัวเลข', () => {
    const validUsername = 'ออม123';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();  
  })

  it('TC4: หาก username ไม่เกิน 13 ตัวอักษร จะสามารถเข้าสู่หน้าต่อไป', () => {
    const validUsername = '1234567890123';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();  
  })
  
  it('TC5: หาก user ไม่สามารถเข้าสู่หน้าต่อไปได้ จะแจ้งเตือนเงื่อนไขการตั้้งชื่อที่ถูกต้อง', () => {
    const validUsername = '@@@';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();
    cy.contains('Name must contain only alphabet Thai and number, and not exceed 13 characters.', { timeout: 10000 }).should('be.visible');
  })
})



describe('US2: แจ้งเตือนให้ผู้ใช้เปลี่ยนชื่อเมื่อ username ซ้ำ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  
  it('username = ออมเลท ทำการlogin เข้าใช้งานสำเร็จ', () => {
    //login ด้วยusername ชื่อ aom เพื่อแน่ใจว่า aom กำลังใช้งานอยู่ในระบบ
    const validUsername = 'ออมเลท';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
  });

  it('TC1: หากชื่อ username มีชื่อซ้ำกับusernameที่ใช้งานอยู่ในระบบ ต้องไม่สามารถเข้าสู่หน้าต่อไปได้ และแจ้งเตือน ”usernameซ้ำ กรุณาตั้งใหม่”', () => {
    //test ว่าเมื่อไปยังหน้าlogin แล้วloginด้วยusername=ออม ต้องขึ้นแจ้งเตือนและไม่ไปหน้าต่อไป
    const validUsername = 'ออมเลท';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();
    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('username ซ้ำ กรุณาตั้งชื่อใหม่').should('be.visible');
  });


});


describe('US1: เมื่อ logout จากระบบ จะลบข้อมูลของ user รวมถึงข้อมูลที่เกี่ยวข้องของ user', () => {

  it('TC1: เมื่อผู้ใช้ทำการ login แล้วกดlogout เมื่อloginด้วยชื่อเดิมจะสามารถเข้าสู่ระบบได้', () => {
    cy.visit('http://localhost:3000');

    const validUsername = 'testLogout';
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    

    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();
    cy.url().should('include', '/login');


    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();  
  });
});
