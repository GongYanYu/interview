input1 = input().split(' ')
n, k = int(input1[0]), int(input1[1])

str_list = list(input())

if int(n / 2) == k:
    if n % 2 == 0:
        print(0)
    else:
        print(1)


i, j = 0, 1
pre_i = 0
is_del = set()

while True:
    if str_list[i] != str_list[j]:
        i += 1
        j += 1
    else:
        is_del.add(i)
        is_del.add(j)
        j += 1
        z = i - 1
        while True:
            if z not in is_del:
                if str_list[z] != str_list[j]:
                    is_del.add(z)
                    is_del.add(j)
                    j += 1
                z -= 1
                if z < 0:
                    break
        i = j
        j += 1
    if j >= n:
        break

print(list(is_del).__str__())
