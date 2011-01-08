def csv_to_json_compressed(csvfile, outputfilename):
    """ convierte pnn_pg.csv al formato json usado por el app.
    el archivo csv fue originalmente bajado de 
    http://cft.gob.mx/es/Cofetel_2008/Cofe_marcacion_y_claves_de_ld"""
    reader = csv.reader(open(csvfile, "rU"))
    titles = reader.next()
    empresas = {}
    prev = {'init': 0, 'fin': 0, 'razon': None}
    rows = []
    for row in reader:
        rows.append(row)
    rows = sorted(rows, key=lambda row: row[10])
    rows = sorted(rows, key=lambda row: row[9])
    rows = sorted(rows, key=lambda row: row[8])
    rows = sorted(rows, key=lambda row: row[7])
    for row in rows:
        diflen = len(row[10]) - len(row[9])
        init = row[7]+row[8]
        for x in range(diflen):
            init+='0'
        init+=row[9]
        fin = int(row[7]+row[8]+row[10])
        init = int(init)
        razon = row[14]
        if razon==prev['razon'] and (int(prev['fin'])+1==int(init)):
            prev = {'init': prev['init'], 'fin':fin, 'razon': razon}
        else:
            if prev['razon'] in empresas:
                empresas[prev['razon']].append((prev['init'], prev['fin']))
            else:
                if prev['razon']!=None:
                    empresas[prev['razon']] = [(prev['init'], prev['fin'])]
            prev = {'init': init, 'fin': fin, 'razon': razon}
    file = open(outputfilename, "w")
    file.write(simplejson.dumps(empresas))
    file.close()
