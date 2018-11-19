challenge = input('challenge: ')

uniq = ''
for x in challenge:
    if x not in uniq:
        uniq += x
print(uniq)
reverse = {' ': ' '}

while len(reverse) < len(uniq):
    for i in range(len(challenge)):
        if challenge[i] in reverse:
            print(reverse[challenge[i]], end='')
        else:
            reverse[challenge[i]] = input('_: ')
            break

problem = ''.join([reverse[x] for x in challenge])
print(reverse)
print(problem)
print(eval(problem))
