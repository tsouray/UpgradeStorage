const { expect } = require('chai')

describe('MyStorage contract', function () {
  it('test deployment', async function () {
    const MyStorage = await ethers.getContractFactory('MyStorage')

    const myStorage = await MyStorage.deploy(123)

    const storedValue = await myStorage.get()

    expect(storedValue).to.equal(123)
  })

  it('test set new value', async function () {
    const MyStorage = await ethers.getContractFactory('MyStorage')

    const myStorage = await MyStorage.deploy(123)

    await myStorage.set(456)

    const storedValue = await myStorage.get()

    expect(storedValue).to.equal(456)
  })
})