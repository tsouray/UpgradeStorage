# Circom & snarkjs 

## Compile 
```
circom circuit.circom --r1cs --wasm --sym
```

## Trust Setup 
>>> New Powers of tau ceremony:
>>> ```
>>> snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
>>> ```
>>> Contribute to the ceremony:
>>> ```
>>> snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
>>> ```
>>> Prepare phase 2 :
>>> ```
>>> snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
>>> ```
>>> Creates an initial Groth16 pkey:
>>> ```
>>> snarkjs g16s circuit.r1cs pot12_final.ptau circuit_final.zkey
>>> ```
>>> Exports a verification key:
>>> ```
>>> snarkjs zkev circuit_final.zkey verification_key.json
>>> ```

## Computing the witness with WebAssembly
create a input.json
>>>```
>>>touch input.json
>>>```
>>>Edit input.json
>>>Generate Witness:
>>>```
>>>cd circuit_js
>>>node generate_witness.js circuit.wasm ../input.json ../witness.wtns
>>>```

## Generating a Proof
```
snarkjs g16p circuit_final.zkey witness.wtns proof.json public.json
```
## Verify Proof
```
snarkjs g16v verification_key.json public.json proof.json
```
## generate Solidity verifier file
```
snarkjs zkesv circuit_final.zkey verifier.sol
```





